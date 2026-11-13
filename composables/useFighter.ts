export interface FighterSkin {
  color: string
  color2: string
  glow: string
  eyes: 'calm' | 'focused' | 'fierce' | 'playful' | 'mysterious' | 'electric' | 'strategic' | 'stoic'
  hands: 'gloves' | 'gauntlets' | 'claws'
  personality: string
}

const SKINS: Record<string, Partial<FighterSkin>> = {
  // Agentes
  'milind-soni-openmausbot': { color: '#f59e0b', color2: '#7c2d12', eyes: 'focused', hands: 'gauntlets', personality: 'ingeniero' },
  'leepokai-codync': { color: '#3b82f6', color2: '#1e3a8a', eyes: 'calm', hands: 'gloves', personality: 'conector' },
  'anil-matcha-open-duet': { color: '#8b5cf6', color2: '#4c1d95', eyes: 'fierce', hands: 'claws', personality: 'líder' },
  'nanocoai-nanoclaw': { color: '#14b8a6', color2: '#134e4a', eyes: 'focused', hands: 'gloves', personality: 'guardián' },
  'nousresearch-hermes-agent': { color: '#eab308', color2: '#713f12', eyes: 'mysterious', hands: 'gauntlets', personality: 'estratega' },
  'cosmicstack-labs-mercury-agent': { color: '#94a3b8', color2: '#334155', eyes: 'electric', hands: 'gloves', personality: 'velocista' },
  'orkas-ai-orkas': { color: '#10b981', color2: '#064e3b', eyes: 'playful', hands: 'gloves', personality: 'comandante' },
  'modelflare-ai-anymodelbot': { color: '#f97316', color2: '#7c2d12', eyes: 'calm', hands: 'gauntlets', personality: 'artesano' },
  'nano-muse-nanomuse': { color: '#ec4899', color2: '#831843', eyes: 'playful', hands: 'gloves', personality: 'explorador' },
  'rokaswk-threebot': { color: '#06b6d4', color2: '#164e63', eyes: 'focused', hands: 'gloves', personality: 'francotirador' },
  'opencrabs-opencrabs': { color: '#ef4444', color2: '#7f1d1d', eyes: 'fierce', hands: 'claws', personality: 'berserker' },
  'microclaw-microclaw': { color: '#84cc16', color2: '#365314', eyes: 'calm', hands: 'gloves', personality: 'vigía' },
  'rowboatlabs-rowboat': { color: '#0ea5e9', color2: '#0c4a6e', eyes: 'calm', hands: 'gloves', personality: 'memoria' },
  'agentscope-ai-qwenpaw': { color: '#a855f7', color2: '#581c87', eyes: 'focused', hands: 'gloves', personality: 'aprendiz' },
  'zhayujie-cowagent': { color: '#22c55e', color2: '#14532d', eyes: 'playful', hands: 'gloves', personality: 'mensajero' },
  'sentelabsai-openexecutive': { color: '#64748b', color2: '#1e293b', eyes: 'strategic', hands: 'gauntlets', personality: 'ejecutivo' },
  'agentvivekkumar-dontbemichael': { color: '#f43f5e', color2: '#881337', eyes: 'fierce', hands: 'claws', personality: 'jefe' },
  'androoagi-starnet': { color: '#6366f1', color2: '#312e81', eyes: 'calm', hands: 'gloves', personality: 'tripulación' },
  'ai-timon-timon': { color: '#f59e0b', color2: '#78350f', eyes: 'strategic', hands: 'gauntlets', personality: 'teniente' },
  // ADEs
  'orca': { color: '#7c3aed', color2: '#2e1065', eyes: 'fierce', hands: 'gauntlets', personality: 'depredador' },
  't3-code': { color: '#111827', color2: '#4b5563', eyes: 'focused', hands: 'gloves', personality: 'arquitecto' },
  'paradev': { color: '#2563eb', color2: '#1e3a8a', eyes: 'calm', hands: 'gloves', personality: 'general' },
  'agent-orchestrator': { color: '#f97316', color2: '#7c2d12', eyes: 'strategic', hands: 'gauntlets', personality: 'orquestador' },
  'kandev': { color: '#eab308', color2: '#713f12', eyes: 'focused', hands: 'gauntlets', personality: 'capataz' },
  'synara': { color: '#06b6d4', color2: '#164e63', eyes: 'electric', hands: 'gloves', personality: 'sinapsis' },
  'bb': { color: '#ec4899', color2: '#831843', eyes: 'playful', hands: 'gloves', personality: 'constructor' },
  'emdash': { color: '#6366f1', color2: '#312e81', eyes: 'calm', hands: 'gauntlets', personality: 'editor' },
  'conductor': { color: '#22c55e', color2: '#14532d', eyes: 'fierce', hands: 'gloves', personality: 'director' },
  'ghostex': { color: '#e5e7eb', color2: '#4b5563', eyes: 'mysterious', hands: 'claws', personality: 'fantasma' },
  'paseo': { color: '#a3e635', color2: '#3f6212', eyes: 'calm', hands: 'gloves', personality: 'nómada' },
  'codex-app': { color: '#10a37f', color2: '#064e3b', eyes: 'focused', hands: 'gauntlets', personality: 'cerebro' },
  'maestri': { color: '#e11d48', color2: '#881337', eyes: 'strategic', hands: 'claws', personality: 'maestro' },
  'solo': { color: '#f59e0b', color2: '#78350f', eyes: 'stoic', hands: 'gauntlets', personality: 'solitario' },
  'openchamber': { color: '#0ea5e9', color2: '#0c4a6e', eyes: 'calm', hands: 'gloves', personality: 'cámara' },
  'cmux': { color: '#d946ef', color2: '#701a75', eyes: 'electric', hands: 'gauntlets', personality: 'multiplexor' },
  'tortie': { color: '#d97706', color2: '#78350f', eyes: 'playful', hands: 'gloves', personality: 'compañero' },
  'herdr': { color: '#64748b', color2: '#1e293b', eyes: 'stoic', hands: 'gauntlets', personality: 'pastor' },
  'traycer': { color: '#8b5cf6', color2: '#4c1d95', eyes: 'strategic', hands: 'gauntlets', personality: 'planificador' },
  'waku': { color: '#84cc16', color2: '#365314', eyes: 'calm', hands: 'gloves', personality: 'nativo' },
  'sidecar': { color: '#f43f5e', color2: '#881337', eyes: 'focused', hands: 'gloves', personality: 'copiloto' },
  'agent-teams-ai': { color: '#f59e0b', color2: '#78350f', eyes: 'strategic', hands: 'gauntlets', personality: 'capitán' }
}

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360
  return h
}

export function useFighter() {
  function skinFor(item: any): FighterSkin {
    const key = String(item?.slug || item?.full_name || item?.name || '')
    const preset = SKINS[key] || {}
    const hue = hash(key)
    const color = preset.color || `hsl(${hue} 70% 55%)`
    const color2 = preset.color2 || `hsl(${(hue + 28) % 360} 72% 28%)`
    return {
      color,
      color2,
      glow: `color-mix(in srgb, ${color} 55%, transparent)`,
      eyes: preset.eyes || (item?.kind === 'ade' ? 'focused' : 'calm'),
      hands: preset.hands || 'gloves',
      personality: preset.personality || (item?.kind === 'ade' ? 'estratega' : 'compañero')
    }
  }

  function styleFor(item: any) {
    const s = skinFor(item)
    return {
      '--f-color': s.color,
      '--f-color2': s.color2,
      '--f-glow': s.glow
    }
  }

  return { skinFor, styleFor }
}
