#!/usr/bin/env node
/*
  Generatore PNG per le Bestie (prima 11) usando una pixel-art stilizzata.
  Output: public/sprites/pngs/<nome>.png
  Requisiti: installare canvas (node-canvas)
  Installazione: npm install canvas --save-dev
  Esecuzione: node scripts/gen_sprites_png.js data/besti_sprite_defs.json
*/
const fs = require('fs')
const path = require('path')
let { createCanvas } = (() => {
  try { return require('canvas') } catch (e) { console.error('Per generare PNG serve canvas (node-canvas). Esegui: npm install canvas --save-dev'); process.exit(1) }
})()

const defsPath = process.argv[2] || path.join(process.cwd(), 'data', 'besti_sprite_defs.json')
let defs = {}
try {
  defs = JSON.parse(fs.readFileSync(defsPath, 'utf8'))
} catch (e) {
  console.error('Impossibile leggere data/besti_sprite_defs.json'); process.exit(1)
}

const outDir = path.join(process.cwd(), 'public', 'sprites', 'pngs')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h = (h<<5) - h + str.charCodeAt(i); h |= 0; } return Math.abs(h) }
function rngFactory(seed){ let s = hashCode(String(seed)); return function(){ s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; } }

const typePal = {
  fire: ['#FF6A00','#FF8C00','#FFB74D','#FFD54F'],
  water: ['#4FC3F7','#29B6F6','#90CAF9','#B3E5FC'],
  nature: ['#66BB6A','#43A047','#81C784','#A5D6A7'],
  earth: ['#8D6E63','#795548','#A1887F','#D7CCC8'],
  poison: ['#7E57C2','#AB47BC','#CE93D8','#E1BEE7'],
  magic: ['#EC407A','#F06292','#BA68C8','#E1BEE7'],
  psycho: ['#5C6BC0','#7E57C2','#BA68C8','#CE93D8'],
  ice: ['#90CAF9','#BBDEFB','#E1F5FE','#B3E5FC'],
  default: ['#9E9E9E','#607D8B','#90A4AE']
}

function renderSprite(name, colors){
  const size = 8
  const block = 8
  const w = size * block, h = size * block
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')
  // background transparent
  ctx.clearRect(0,0,w,h)
  // seed-based RNG for deterministic output per name
  const rnd = rngFactory(name + '_png')
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      if (rnd() > 0.3) { // draw a block with some probability
        const idx = Math.floor(rnd() * colors.length)
        const color = colors[idx]
        ctx.fillStyle = color
        ctx.fillRect(x*block, y*block, block, block)
      }
    }
  }
  // save PNG
  const buf = c.toBuffer('image/png')
  const outPath = path.join(outDir, name.toLowerCase() + '.png')
  fs.writeFileSync(outPath, buf)
}

for (const [id, def] of Object.entries(defs)){
  const name = def.name || id
  const t = (def.types && def.types[0]) || 'default'
  const colors = (typePal[t] || typePal.default)
  renderSprite(name, colors)
  console.log('Generated PNG for', name, '=>', path.join('public','sprites','pngs', name.toLowerCase() + '.png'))
}
