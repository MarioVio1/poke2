// NPC Movement System - Personaggi che si muovono nella mappa

export interface NPC {
  id: string
  name: string
  sprite: string
  x: number
  y: number
  direction: 'up' | 'down' | 'left' | 'right'
  movement: 'still' | 'patrol' | 'random' | 'follow'
  speed: number
  route?: { x: number; y: number }[]
  dialog?: string[]
  give?: { item: string }
  battle?: { besti: string[]; lvl: number }
  color?: string
}

export interface MovingNPC extends NPC {
  targetX: number
  targetY: number
  waitTime: number
  currentRouteIndex: number
  lastMove: number
}

export const NPC_MOVEMENTS = {
  still: (npc: MovingNPC, now: number) => false,
  
  random: (npc: MovingNPC, now: number): boolean => {
    if (now - npc.lastMove < 2000) return false
    const dirs = ['up', 'down', 'left', 'right'] as const
    npc.direction = dirs[Math.floor(Math.random() * 4)]
    npc.lastMove = now
    return true
  },
  
  patrol: (npc: MovingNPC, now: number): boolean => {
    if (!npc.route || npc.route.length === 0) return false
    if (now - npc.lastMove < 1500) return false
    
    const target = npc.route[npc.currentRouteIndex]
    const dx = target.x - npc.x
    const dy = target.y - npc.y
    
    if (Math.abs(dx) + Math.abs(dy) < 1) {
      npc.currentRouteIndex = (npc.currentRouteIndex + 1) % npc.route.length
      npc.lastMove = now
      return false
    }
    
    if (Math.abs(dx) > Math.abs(dy)) {
      npc.direction = dx > 0 ? 'right' : 'left'
    } else {
      npc.direction = dy > 0 ? 'down' : 'up'
    }
    
    npc.lastMove = now
    return true
  },
  
  follow: (npc: MovingNPC, now: number, playerX?: number, playerY?: number): boolean => {
    if (playerX === undefined || playerY === undefined) return false
    const dist = Math.abs(playerX - npc.x) + Math.abs(playerY - npc.y)
    if (dist < 2 || dist > 8) return false
    if (now - npc.lastMove < 1000) return false
    
    const dx = playerX - npc.x
    const dy = playerY - npc.y
    
    if (Math.abs(dx) > Math.abs(dy)) {
      npc.direction = dx > 0 ? 'right' : 'left'
    } else {
      npc.direction = dy > 0 ? 'down' : 'up'
    }
    
    npc.lastMove = now
    return true
  }
}

export const npcMove = (
  npc: NPC,
  type: 'patrol' | 'random' | 'follow',
  playerX?: number,
  playerY?: number,
  now?: number
): { x: number; y: number; direction: string } | null => {
  const moveFunc = NPC_MOVEMENTS[type]
  if (!moveFunc) return null
  
  const shouldMove = type === 'follow'
    ? moveFunc(npc as MovingNPC, now || 0, playerX, playerY)
    : moveFunc(npc as MovingNPC, now || 0)
  
  if (!shouldMove) return null
  
  const movements: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  }
  
  return movements[npc.direction] || null
}

export const npcCanMoveTo = (
  npcX: number,
  npcY: number,
  map: number[][],
  direction: string
): boolean => {
  const movements: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  }
  
  const move = movements[direction]
  if (!move) return false
  
  const newX = npcX + move.x
  const newY = npcY + move.y
  
  if (newY < 0 || newY >= map.length) return false
  if (newX < 0 || newX >= map[0]?.length) return false
  
  const tile = map[newY][newX]
  return tile === 0 || tile === 3 || tile === 4 || tile === 7 || tile === 10
}

// Default NPCs per mappe
export const MAP_NPCS: Record<string, NPC[]> = {
  canalborgo: [
    {
      id: 'gondoliere',
      name: 'Gondoliere',
      sprite: 'npc_male',
      x: 10,
      y: 8,
      direction: 'down',
      movement: 'patrol',
      speed: 1,
      route: [
        { x: 10, y: 8 },
        { x: 12, y: 8 },
        { x: 12, y: 6 },
        { x: 10, y: 6 }
      ],
      dialog: ['Vogalando per i canali...'],
      color: '#4fc3f7'
    },
    {
      id: 'vicino',
      name: 'Umberto',
      sprite: 'old_man',
      x: 5,
      y: 4,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['Oi belòto! Te sì nuovo?'],
      color: '#8d6e63'
    },
    {
      id: 'bambino',
      name: 'Paolino',
      sprite: 'child',
      x: 8,
      y: 10,
      direction: 'right',
      movement: 'random',
      speed: 1,
      dialog: ['Anche ti ghè un trainer!'],
      color: '#ffb74d'
    }
  ],
  spritzia: [
    {
      id: 'bepi',
      name: 'Bepi',
      sprite: 'gym_leader',
      x: 7,
      y: 6,
      direction: 'down',
      movement: 'patrol',
      speed: 1,
      route: [
        { x: 7, y: 6 },
        { x: 9, y: 6 },
        { x: 9, y: 8 },
        { x: 7, y: 8 }
      ],
      dialog: ['CHE BEVEMO OGGI?!'],
      color: '#ffb74d'
    },
    {
      id: 'barista',
      name: 'Luca',
      sprite: 'shopkeeper',
      x: 12,
      y: 4,
      direction: 'right',
      movement: 'still',
      speed: 0,
      dialog: ['Oi! Cosa te porte?'],
      color: '#ff9800'
    }
  ],
  veronara: [
    {
      id: 'giuliano',
      name: 'Giuliano',
      sprite: 'gym_leader',
      x: 7,
      y: 6,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['Combattemo con ONORE!'],
      color: '#e53935'
    },
    {
      id: 'giulietta',
      name: 'Giulietta',
      sprite: 'npc_female',
      x: 10,
      y: 8,
      direction: 'left',
      movement: 'patrol',
      speed: 1,
      route: [
        { x: 10, y: 8 },
        { x: 12, y: 8 },
        { x: 12, y: 10 },
        { x: 10, y: 10 }
      ],
      dialog: ['El mio Giuliano...'],
      color: '#f48fb1'
    }
  ],
  padoana: [
    {
      id: 'sansovino',
      name: 'Prof. Sansovino',
      sprite: 'professor',
      x: 7,
      y: 5,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['Dove gero? Ah sì...'],
      color: '#7e57c2'
    }
  ],
  trevisella: [
    {
      id: 'nonno_gino',
      name: 'Nonno Gino',
      sprite: 'old_man',
      x: 6,
      y: 6,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['El radicchio! El mio radicchio!'],
      color: '#7cb342'
    },
    {
      id: 'nonna_gina',
      name: 'Nonna Gina',
      sprite: 'old_woman',
      x: 10,
      y: 6,
      direction: 'down',
      movement: 'random',
      speed: 1,
      dialog: ['TeGHÈ fame?!'],
      color: '#aed581'
    }
  ],
  dolomax: [
    {
      id: 'regina',
      name: 'Regina Ghiacci',
      sprite: 'gym_leader',
      x: 7,
      y: 5,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['IL FREDDO XE MIO!'],
      color: '#90caf9'
    },
    {
      id: 'guardia',
      name: 'Guardia Neve',
      sprite: 'fighter',
      x: 12,
      y: 6,
      direction: 'left',
      movement: 'patrol',
      speed: 1,
      route: [
        { x: 12, y: 6 },
        { x: 14, y: 6 },
        { x: 14, y: 8 },
        { x: 12, y: 8 }
      ],
      dialog: ['NON PASSI!'],
      color: '#b0bec5'
    }
  ],
  gardalago: [
    {
      id: 'maestro',
      name: 'Maestro Marco',
      sprite: 'gym_leader',
      x: 5,
      y: 5,
      direction: 'down',
      movement: 'still',
      speed: 0,
      dialog: ['XEI PRONTO?'],
      color: '#ffd54f'
    }
  ]
}

export const getNPCsForMap = (mapName: string): NPC[] => {
  return MAP_NPCS[mapName] || []
}

export const getNPCById = (mapName: string, npcId: string): NPC | undefined => {
  const npcs = MAP_NPCS[mapName]
  if (!npcs) return undefined
  return npcs.find(n => n.id === npcId)
}