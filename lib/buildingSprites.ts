// Building Sprites - Sprite PNG per edifici e case
// Generated from GBC Battle Sprites Revamped

export const BUILDING_SPRITES: Record<string, string> = {
  // Case
  'house_wood': '/sprites/buildings/house_wood.png',
  'house_stone': '/sprites/buildings/house_stone.png',
  'house_large': '/sprites/buildings/house_large.png',
  'house_small': '/sprites/buildings/house_small.png',
  
  // Edifici speciali
  'pokemon_center': '/sprites/buildings/pokemon_center.png',
  'gym': '/sprites/buildings/gym.png',
  'lab': '/sprites/buildings/lab.png',
  'shop': '/sprites/buildings/shop.png',
  'tower': '/sprites/buildings/tower.png',
  'ruins': '/sprites/buildings/ruins.png',
  'cave': '/sprites/buildings/cave.png',
  'lake': '/sprites/buildings/lake.png',
  
  // Ponti e canali
  'bridge': '/sprites/buildings/bridge.png',
  'water': '/sprites/buildings/water.png',
  'boat': '/sprites/buildings/boat.png',
  'gondola': '/sprites/buildings/gondola.png',
  
  // Alberi e natura
  'tree': '/sprites/buildings/tree.png',
  'bush': '/sprites/buildings/bush.png',
  'flower': '/sprites/buildings/flower.png',
  'rock': '/sprites/buildings/rock.png',
}

export const TILE_SPRITES: Record<number, string> = {
  0: '/sprites/buildings/grass.png',      // Erba
  1: '/sprites/buildings/wall.png',       // Muro
  2: '/sprites/buildings/water.png',      // Acqua
  3: '/sprites/buildings/floor.png',      // Pavimento
  4: '/sprites/buildings/path.png',       // Sentiero
  5: '/sprites/buildings/sand.png',     // Sabbia
  6: '/sprites/buildings/house.png',      // Casa
  7: '/sprites/buildings/flower.png',     // Fiore
  8: '/sprites/buildings/tree.png',       // Albero
  9: '/sprites/buildings/tree.png',     // Alberi grandi
  10: '/sprites/buildings/road.png',     // Strada
  11: '/sprites/buildings/bridge.png',  // Ponte
  12: '/sprites/buildings/lake.png',   // Lago
  13: '/sprites/buildings/cave.png',   // Caverna
  14: '/sprites/buildings/ruins.png',  // Rovine
  15: '/sprites/buildings/gym.png',      // Palestra
  16: '/sprites/buildings/shop.png',    // Negozio
  17: '/sprites/buildings/lab.png',   // Laboratorio
  18: '/sprites/buildings/center.png',   // Centro Pokemon
}

// Building animation frames
export const BUILDING_ANIMATIONS = {
  'pokemon_center': { frames: 4, speed: 500 },
  'gym': { frames: 1, speed: 0 },
  'water': { frames: 4, speed: 300 },
  'fire': { frames: 4, speed: 200 },
  'lava': { frames: 4, speed: 150 },
}

// NPC sprite types
export const NPC_SPRITES = {
  'professor': '/sprites/npc/professor.png',
  'rival': '/sprites/npc/rival.png',
  'gym_leader': '/sprites/npc/gym_leader.png',
  'shopkeeper': '/sprites/npc/shopkeeper.png',
  'npc_male': '/sprites/npc/npc_male.png',
  'npc_female': '/sprites/npc/npc_female.png',
  'old_man': '/sprites/npc/old_man.png',
  'old_woman': '/sprites/npc/old_woman.png',
  'child': '/sprites/npc/child.png',
  'fighter': '/sprites/npc/fighter.png',
  'biker': '/sprites/npc/biker.png',
  'swimmer': '/sprites/npc/swimmer.png',
  'fisherman': '/sprites/npc/fisherman.png',
  'rocker': '/sprites/npc/rocker.png',
  'coach': '/sprites/npc/coach.png',
}