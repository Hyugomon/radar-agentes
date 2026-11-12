/** Tarjeta 1080×1350 para X / reels, dibujada con canvas (sin dependencias). */
export function usePoster() {
  function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    g.beginPath()
    if ((g as any).roundRect) {
      ;(g as any).roundRect(x, y, w, h, r)
      return
    }
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
  }

  function build(a: any, b: any, dims: any[], stamp: string): HTMLCanvasElement {
    const W = 1080
    const H = 1350
    const c = document.createElement('canvas')
    c.width = W
    c.height = H
    const g = c.getContext('2d')!
    const fam = '"Segoe UI",system-ui,sans-serif'

    const bg = g.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#f8fbff'); bg.addColorStop(0.55, '#eef4fd'); bg.addColorStop(1, '#e9e2fb')
    g.fillStyle = bg
    g.fillRect(0, 0, W, H)
    g.globalAlpha = 0.5
    g.fillStyle = '#cfe2ff'; g.beginPath(); g.arc(92, 66, 232, 0, 7); g.fill()
    g.fillStyle = '#e3d4ff'; g.beginPath(); g.arc(1008, 44, 224, 0, 7); g.fill()
    g.globalAlpha = 1

    g.fillStyle = '#5a6b81'
    g.font = `700 21px ${fam}`
    g.fillText('🛰️ RADAR DE AGENTES IA', 64, 86)
    g.textAlign = 'right'
    g.fillText(stamp, W - 64, 86)
    g.textAlign = 'left'

    const tg = g.createLinearGradient(64, 130, 640, 300)
    tg.addColorStop(0, '#1d4ed8'); tg.addColorStop(1, '#7c3aed')
    g.fillStyle = tg
    g.font = `900 118px ${fam}`
    g.fillText('VERSUS', 60, 278)

    const rows = dims.map(d => ({ label: d.label, av: Number(a.dimensions?.[d.key] || 0), bv: Number(b.dimensions?.[d.key] || 0) }))
    const aw = rows.filter(r => r.av > r.bv).length
    const bw = rows.filter(r => r.bv > r.av).length

    let winner: 'a' | 'b' | null = null
    if (Math.abs(a.total - b.total) > 0.049) winner = a.total > b.total ? 'a' : 'b'
    else if (a.agency !== b.agency) winner = a.agency > b.agency ? 'a' : 'b'
    const wrap = (text: string, x: number, y: number, maxW: number, lh: number, align: CanvasTextAlign) => {
      g.textAlign = align
      const words = String(text).split(' ')
      const lines: string[] = []
      let line = ''
      for (const w of words) {
        const test = line ? `${line} ${w}` : w
        if (g.measureText(test).width > maxW && line) { lines.push(line); line = w } else line = test
      }
      if (line) lines.push(line)
      lines.slice(0, 2).forEach((l, i) => g.fillText(l, x, y + i * lh))
      g.textAlign = 'left'
    }

    g.fillStyle = '#0d1526'
    g.font = `800 40px ${fam}`
    wrap(a.full_name.replace('/', ' / '), 64, 392, 430, 46, 'left')
    wrap(b.full_name.replace('/', ' / '), 1016, 392, 430, 46, 'right')

    g.fillStyle = '#7b879c'
    g.font = `700 18px ${fam}`
    g.fillText('GROK SCORE', 64, 512)
    g.textAlign = 'right'; g.fillText('GROK SCORE', 1016, 512); g.textAlign = 'left'

    g.font = `900 104px ${fam}`
    g.fillStyle = '#1d4ed8'; g.fillText(a.total.toFixed(1), 60, 606)
    g.textAlign = 'right'; g.fillStyle = '#7c3aed'; g.fillText(b.total.toFixed(1), 1020, 606); g.textAlign = 'left'

    g.fillStyle = '#0d1526'
    g.font = `700 23px ${fam}`
    g.fillText(`Tier ${a.tier} · ADN ${Math.round(a.agency)} · ${a.confidence}/100 conf.`, 64, 652)
    g.textAlign = 'right'
    g.fillText(`Tier ${b.tier} · ADN ${Math.round(b.agency)} · ${b.confidence}/100 conf.`, 1016, 652)
    g.textAlign = 'left'

    g.fillStyle = '#ffffff'
    rr(g, 64, 692, W - 128, 304, 24); g.fill()
    g.strokeStyle = '#e1e8f2'; g.lineWidth = 2; g.stroke()
    g.fillStyle = '#7b879c'; g.font = `700 17px ${fam}`
    g.fillText('DIMENSIONES · NOTA 0-100', 96, 738)

    const trackW = 300
    rows.forEach((r, i) => {
      const y = 780 + i * 30
      const awin = r.av > r.bv
      const bwin = r.bv > r.av
      g.textAlign = 'right'
      g.fillStyle = awin ? '#1d4ed8' : '#7b879c'
      g.font = `800 19px ${fam}`
      g.fillText(String(r.av), 132, y + 7)
      g.fillStyle = '#e6ecf5'; rr(g, 148, y, trackW, 9, 5); g.fill()
      g.globalAlpha = awin ? 1 : 0.42
      g.fillStyle = '#1d4ed8'
      rr(g, 148 + trackW * (1 - r.av / 100), y, trackW * (r.av / 100), 9, 5); g.fill()
      g.globalAlpha = 1

      g.textAlign = 'center'
      g.fillStyle = '#64748b'
      g.font = `700 17px ${fam}`
      g.fillText(r.label, 540, y + 8)

      g.fillStyle = '#e6ecf5'; rr(g, 632, y, trackW, 9, 5); g.fill()
      g.globalAlpha = bwin ? 1 : 0.42
      g.fillStyle = '#7c3aed'
      rr(g, 632, y, trackW * (r.bv / 100), 9, 5); g.fill()
      g.globalAlpha = 1
      g.textAlign = 'left'
      g.fillStyle = bwin ? '#7c3aed' : '#7b879c'
      g.fillText(String(r.bv), 948, y + 7)
    })
    g.textAlign = 'left'

    const band = g.createLinearGradient(64, 1030, W - 64, 1190)
    band.addColorStop(0, '#1d4ed8'); band.addColorStop(1, '#7c3aed')
    g.fillStyle = band
    rr(g, 64, 1030, W - 128, 160, 26); g.fill()
    g.fillStyle = '#fff'
    g.font = `800 36px ${fam}`
    wrap(winner ? `👑 Gana ${winner === 'a' ? a.full_name : b.full_name}` : '🤝 Empate técnico', 100, 1092, W - 220, 42, 'left')
    g.globalAlpha = 0.94
    g.font = `600 22px ${fam}`
    const sub = winner
      ? `por ${Math.abs(a.total - b.total).toFixed(1)} pts · ${winner === 'a' ? aw : bw} de ${rows.length} dimensiones · ADN ${Math.round(a.agency)} vs ${Math.round(b.agency)}`
      : `mismos puntos · ADN ${Math.round(a.agency)} vs ${Math.round(b.agency)}`
    g.fillText(sub, 100, 1150)
    g.globalAlpha = 1

    g.fillStyle = '#5a6b81'
    g.font = `600 19px ${fam}`
    g.fillText(host(a.website), 64, 1250)
    g.textAlign = 'right'; g.fillText(host(b.website), W - 64, 1250)
    g.textAlign = 'center'
    g.fillStyle = '#7b879c'
    g.font = `600 17px ${fam}`
    g.fillText('Veredicto contra el listón de Grok Bot · 8 dimensiones y ADN · Radar de Agentes IA', W / 2, 1300)
    g.textAlign = 'left'

    return c
  }

  function host(url: string) {
    try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url || '' }
  }

  function download(a: any, b: any, dims: any[], stamp: string) {
    const canvas = build(a, b, dims, stamp)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `versus-${a.slug}-vs-${b.slug}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 4000)
    }, 'image/png')
  }

  return { download }
}
