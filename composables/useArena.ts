import * as THREE from 'three'

export type Side = 'a' | 'b'

interface Tween {
  obj: any
  key: string
  from: number
  to: number
  t0: number
  dur: number
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

function randomOnSphere(radius: number) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

/**
 * Arena 3D del versus: dos núcleos de energía que chocan, disparan haces y
 * terminan uno apagado (rojo, hundido) y otro dorado.
 */
export function createArena(canvas: HTMLCanvasElement) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  // Sin MSAA en el renderer: con post-proceso el antialias se resuelve en el composer (SMAA).
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75)
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x05080f, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x05080f, 12, 26)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60)
  camera.position.set(0, 1.4, 8.4)
  camera.lookAt(0, 0.2, 0)

  // 3 luces: ambiente + direccional + las dos point de los núcleos (baratas, sin sombras)
  scene.add(new THREE.AmbientLight(0x2a3b5c, 1.2))
  const key = new THREE.DirectionalLight(0xbcd4ff, 1.3)
  key.position.set(3, 6, 5)
  scene.add(key)

  // suelo técnico
  const grid = new THREE.GridHelper(40, 40, 0x1b2c46, 0x101b2c)
  ;(grid.material as THREE.Material).transparent = true
  ;(grid.material as THREE.Material).opacity = 0.55
  grid.position.y = -1.65
  scene.add(grid)

  const COLORS = { a: 0x5b9dff, b: 0xa78bfa, gold: 0xffd166, red: 0xff3b30 }
  const tweens: Tween[] = []

  function tween(obj: any, keyPath: string, to: number, dur: number) {
    const keys = keyPath.split('.')
    let target = obj
    for (let i = 0; i < keys.length - 1; i++) target = target[keys[i]]
    const last = keys[keys.length - 1]
    tweens.push({ obj: target, key: last, from: Number(target[last]), to, t0: performance.now(), dur })
  }

  function makeCore(side: Side, color: number) {
    const group = new THREE.Group()
    const geo = new THREE.IcosahedronGeometry(0.92, 3)
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 1.5,
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: 1
    })
    const core = new THREE.Mesh(geo, mat)
    group.add(core)

    const shellGeo = new THREE.IcosahedronGeometry(1.22, 1)
    const shellMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.22 })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    group.add(shell)

    const ringGeo = new THREE.TorusGeometry(1.55, 0.018, 6, 96)
    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.2
    group.add(ring)

    const haloGeo = new THREE.SphereGeometry(1.9, 24, 24)
    const haloMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, side: THREE.BackSide })
    group.add(new THREE.Mesh(haloGeo, haloMat))

    const light = new THREE.PointLight(color, 9, 9, 2)
    light.position.set(0, 0, 0)
    group.add(light)

    scene.add(group)
    return { group, core, shell, ring, mat, shellMat, ringMat, light, base: side === 'a' ? -2.25 : 2.25 }
  }

  const A = makeCore('a', COLORS.a)
  const B = makeCore('b', COLORS.b)
  A.group.position.set(-2.25, 0.1, 0)
  B.group.position.set(2.25, 0.1, 0)

  // partículas ambientales
  const dustCount = isMobile ? 220 : 420
  const dustGeo = new THREE.BufferGeometry()
  const dustPos = new Float32Array(dustCount * 3)
  for (let i = 0; i < dustCount; i++) {
    const p = randomOnSphere(6.5)
    dustPos[i * 3] = p.x
    dustPos[i * 3 + 1] = p.y * 0.55
    dustPos[i * 3 + 2] = p.z
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dustMat = new THREE.PointsMaterial({ size: 0.035, color: 0x8fb6ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
  const dust = new THREE.Points(dustGeo, dustMat)
  scene.add(dust)

  // onda de choque
  const waveGeo = new THREE.RingGeometry(0.6, 0.72, 96)
  const waveMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
  const wave = new THREE.Mesh(waveGeo, waveMat)
  wave.position.set(0, 0.1, 0)
  wave.rotation.x = -Math.PI / 2.6
  scene.add(wave)

  // chispas de impacto
  const sparkCount = isMobile ? 90 : 160
  const sparkGeo = new THREE.BufferGeometry()
  const sparkPos = new Float32Array(sparkCount * 3)
  const sparkGeoInit = new Float32Array(sparkCount * 3)
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
  const sparkMat = new THREE.PointsMaterial({ size: 0.07, color: 0xffe9b0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  const sparks = new THREE.Points(sparkGeo, sparkMat)
  scene.add(sparks)
  const sparkVel: number[] = []
  let sparkT0 = 0

  // haz
  const beamGeo = new THREE.CylinderGeometry(0.045, 0.045, 1, 8, 1, true)
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  const beam = new THREE.Mesh(beamGeo, beamMat)
  scene.add(beam)

  // haces verticales decorativos
  const pillars: THREE.Mesh[] = []
  for (let i = 0; i < 8; i++) {
    const g = new THREE.CylinderGeometry(0.006, 0.006, 3.2, 5, 1, true)
    const m = new THREE.MeshBasicMaterial({ color: 0x2b4a7a, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    const p = new THREE.Mesh(g, m)
    const angle = (i / 8) * Math.PI * 2
    p.position.set(Math.cos(angle) * 5.4, 0.2, Math.sin(angle) * 4.2)
    scene.add(p)
    pillars.push(p)
  }

  let width = 1
  let height = 1
  function resize() {
    const rect = canvas.parentElement?.getBoundingClientRect()
    width = Math.max(1, Math.round(rect?.width || 1))
    height = Math.max(1, Math.round(rect?.height || 1))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    composer?.setSize?.(width, height)
  }
  const ro = new ResizeObserver(resize)
  if (canvas.parentElement) ro.observe(canvas.parentElement)
  resize()

  // bloom opcional: si falla, se renderiza plano
  let composer: any = null
  ;(async () => {
    try {
      const mod: any = await import('postprocessing')
      const c = new mod.EffectComposer(renderer)
      c.addPass(new mod.RenderPass(scene, camera))
      const bloom = new mod.BloomEffect({ intensity: 1.35, luminanceThreshold: 0.22, luminanceSmoothing: 0.5, mipmapBlur: true })
      const smaa = new mod.SMAAEffect()
      c.addPass(new mod.EffectPass(camera, bloom, smaa, new mod.VignetteEffect({ darkness: 0.45, offset: 0.32 })))
      c.setSize(width, height)
      composer = c
    } catch (err) {
      console.warn('[arena] bloom no disponible', err)
    }
  })()

  const clock = new THREE.Clock()
  let rafLoop = 0
  let shake = 0
  let running = true
  let finished = false
  let contextLost = false

  function burst(position: THREE.Vector3, color: number, amount = 90) {
    sparkMat.color.setHex(color)
    const arr = sparkGeo.getAttribute('position') as THREE.BufferAttribute
    sparkVel.length = 0
    for (let i = 0; i < sparkCount; i++) {
      if (i < amount) {
        arr.setXYZ(i, position.x, position.y, position.z)
        const dir = randomOnSphere(1)
        sparkVel.push(dir.x * 2.6, Math.abs(dir.y) * 2.2 + 0.6, dir.z * 2.6)
      } else {
        arr.setXYZ(i, 0, -999, 0)
        sparkVel.push(0, 0, 0)
      }
      sparkGeoInit[i * 3] = position.x
      sparkGeoInit[i * 3 + 1] = position.y
      sparkGeoInit[i * 3 + 2] = position.z
    }
    arr.needsUpdate = true
    sparkT0 = performance.now()
  }

  function beamBetween(from: THREE.Vector3, to: THREE.Vector3, color: number) {
    const start = from.clone()
    const end = to.clone()
    const dist = start.distanceTo(end)
    beam.position.copy(start).add(end).multiplyScalar(0.5)
    beam.scale.set(1, dist, 1)
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize())
    beamMat.color.setHex(color)
    beamMat.opacity = 0
    tween(beamMat, 'opacity', 1, 90)
    setTimeout(() => tween(beamMat, 'opacity', 0, 220), 140)
  }

  function render() {
    if (!running || contextLost) return
    const dt = Math.min(0.05, clock.getDelta())
    const t = clock.elapsedTime
    const now = performance.now()

    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i]
      const k = clamp((now - tw.t0) / tw.dur, 0, 1)
      tw.obj[tw.key] = tw.from + (tw.to - tw.from) * easeInOut(k)
      if (k >= 1) tweens.splice(i, 1)
    }

    if (!finished) {
      A.group.position.y = 0.1 + Math.sin(t * 1.1) * 0.12
      B.group.position.y = 0.1 + Math.sin(t * 1.1 + 1.6) * 0.12
      A.core.rotation.y += dt * 0.35
      A.core.rotation.x += dt * 0.12
      B.core.rotation.y -= dt * 0.32
      B.core.rotation.x += dt * 0.1
      A.shell.rotation.y -= dt * 0.5
      B.shell.rotation.y += dt * 0.48
      A.ring.rotation.z += dt * 0.6
      B.ring.rotation.z -= dt * 0.55
    }

    dust.rotation.y += dt * 0.04
    pillars.forEach((p, i) => { p.material.opacity = 0.18 + Math.sin(t * 1.3 + i) * 0.1 })

    // onda de choque
    if (waveMat.opacity > 0.01) {
      const k = 1 - waveMat.opacity
      wave.scale.setScalar(1 + k * 9)
      waveMat.opacity = Math.max(0, waveMat.opacity - dt * 1.6)
    }

    // chispas
    if (sparkMat.opacity > 0.01) {
      const elapsed = (now - sparkT0) / 1000
      const arr = sparkGeo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < sparkCount; i++) {
        const vx = sparkVel[i * 3] || 0
        const vy = sparkVel[i * 3 + 1] || 0
        const vz = sparkVel[i * 3 + 2] || 0
        if (vx === 0 && vy === 0 && vz === 0) continue
        arr.setXYZ(i, sparkGeoInit[i * 3] + vx * elapsed, sparkGeoInit[i * 3 + 1] + vy * elapsed - 4.2 * elapsed * elapsed, sparkGeoInit[i * 3 + 2] + vz * elapsed)
      }
      arr.needsUpdate = true
      sparkMat.opacity = Math.max(0, 1 - elapsed / 0.9)
    }

    // cámara con sacudida
    if (shake > 0.001) {
      camera.position.x = (Math.random() - 0.5) * shake
      camera.position.y = 1.4 + (Math.random() - 0.5) * shake * 0.6
      shake *= 0.9
    } else if (finished) {
      camera.position.x += (0 - camera.position.x) * 0.05
      camera.position.y += (1.1 - camera.position.y) * 0.05
    }
    camera.lookAt(finished ? 0 : 0, 0.15, 0)

    if (composer) composer.render()
    else renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(render)

  const onVisibility = () => { running = document.visibilityState === 'visible' }
  document.addEventListener('visibilitychange', onVisibility)

  // pérdida de contexto: se congela en el último frame y se avisa al componente
  const onContextLost = (event: Event) => {
    event.preventDefault()
    contextLost = true
    running = false
    canvas.dispatchEvent(new CustomEvent('arena:lost'))
  }
  const onContextRestored = () => {
    contextLost = false
    running = document.visibilityState === 'visible'
  }
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  return {
    async clash() {
      shake = 0.35
      tween(A.group.position, 'x', -0.35, 260)
      tween(B.group.position, 'x', 0.35, 260)
      await new Promise(r => setTimeout(r, 250))
      waveMat.opacity = 1
      burst(new THREE.Vector3(0, 0.2, 0), 0xffffff, 120)
      shake = 0.9
      camera.position.z = 7.6
      tween(camera.position, 'z', 8.4, 700)
      await new Promise(r => setTimeout(r, 170))
      tween(A.group.position, 'x', -2.25, 420)
      tween(B.group.position, 'x', 2.25, 420)
      await new Promise(r => setTimeout(r, 430))
    },

    round(winner: Side) {
      const from = winner === 'a' ? A.group.position.clone() : B.group.position.clone()
      const to = winner === 'a' ? B.group.position.clone() : A.group.position.clone()
      const target = winner === 'a' ? B : A
      beamBetween(from, to, winner === 'a' ? COLORS.a : COLORS.b)
      setTimeout(() => {
        burst(to, winner === 'a' ? COLORS.a : COLORS.b, 70)
        shake = 0.4
        tween(target.mat, 'emissiveIntensity', 3.2, 90)
        setTimeout(() => tween(target.mat, 'emissiveIntensity', 1.1, 320), 120)
      }, 120)
      tween(target.group.position, 'y', target.group.position.y - 0.14, 140)
      setTimeout(() => tween(target.group.position, 'y', target.group.position.y + 0.14, 420), 180)
    },

    finish(winner: Side) {
      finished = true
      const win = winner === 'a' ? A : B
      const lose = winner === 'a' ? B : A

      win.mat.color.setHex(COLORS.gold)
      win.mat.emissive.setHex(COLORS.gold)
      ;(win.shell.material as THREE.MeshBasicMaterial).color.setHex(COLORS.gold)
      ;(win.ring.material as THREE.MeshBasicMaterial).color.setHex(COLORS.gold)
      win.light.color.setHex(COLORS.gold)
      tween(win.mat, 'emissiveIntensity', 2.6, 700)
      tween(win.group.scale, 'x', 1.12, 700)
      tween(win.group.scale, 'y', 1.12, 700)
      tween(win.group.scale, 'z', 1.12, 700)
      tween(win.light, 'intensity', 16, 700)

      lose.mat.color.setHex(COLORS.red)
      lose.mat.emissive.setHex(COLORS.red)
      ;(lose.shell.material as THREE.MeshBasicMaterial).color.setHex(0x4a1b18)
      ;(lose.ring.material as THREE.MeshBasicMaterial).color.setHex(0x4a1b18)
      lose.light.color.setHex(COLORS.red)
      tween(lose.mat, 'emissiveIntensity', 0.12, 900)
      tween(lose.mat, 'opacity', 0.35, 900)
      tween(lose.shell.material as any, 'opacity', 0.06, 900)
      tween(lose.ring.material as any, 'opacity', 0.08, 900)
      tween(lose.light, 'intensity', 0.8, 900)
      tween(lose.group.position, 'y', -1.25, 1100)
      tween(lose.group.rotation, 'z', 0.5, 1100)

      burst(win.group.position.clone(), COLORS.gold, 140)
    },

    dispose() {
      running = false
      renderer.setAnimationLoop(null)
      cancelAnimationFrame(rafLoop)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      scene.traverse(obj => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = (mesh as any).material
        if (Array.isArray(material)) material.forEach((m: any) => m.dispose())
        else if (material) material.dispose()
      })
      composer?.dispose?.()
      renderer.dispose()
      renderer.forceContextLoss?.()
    }
  }
}
