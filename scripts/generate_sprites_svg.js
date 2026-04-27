#!/usr/bin/env node
/**
 * Simple SVG pixel-art sprite generator for Besti.
 * Output: public/sprites/svg/<name>.svg
 * Usage: node scripts/generate_sprites_svg.js data/besti_sprite_defs.json
 */
const fs = require('fs')
const path = require('path')

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}) }

function hashCode(str){ // simple string hash
  let h=0;
  for(let i=0;i<str.length;i++){ h = (h<<5) - h + str.charCodeAt(i); h |=0; }
  return Math.abs(h)
}

function seedRand(seed){ let s = hashCode(seed.toString()) % 2147483647; return function(){ s = (s * 1103515245 + 12345) % 2147483647; return s / 2147483647; } }

function genPixelArt(seed, colorPalette, size=8){
  const rnd = seedRand(seed)
  // 0 means transparent; 1..palette.length color indexes
  const grid = Array.from({length:size}, ()=> Array.from({length:size}, ()=> {
    // sparse probability of color
    const v = Math.floor(rnd()* (colorPalette.length+1));
    return v==0 ? 0 : v-1+1; // ensure 1..N
  }))
  // map to color strings, keep 0 as transparent
  return grid
}

function toSvg(name, colors){
  const W = 64, H = 64
  const block = 8
  // build a small 8x8 grid deterministically based on name
  const grid = genPixelArt(name, colors, 8)
  let d = ''
  let colorIndexMax = colors.length
  for(let y=0;y<8;y++){
    for(let x=0;x<8;x++){
      const idx = grid[y][x]
      if(!idx) continue
      const color = colors[(idx-1) % colors.length]
      d += `<rect x="${x*block}" y="${y*block}" width="${block}" height="${block}" fill="${color}"/>`
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`+
    `<rect width="100%" height="100%" fill="transparent"/>`+
    `${d}`+
  `</svg>`
  return svg
}

function ensureSvgPath(outDir, name){
  ensureDir(outDir)
  return path.join(outDir, name+".svg")
}

function main() {
  const input = process.argv[2] || 'data/besti_sprite_defs.json'
  const defs = JSON.parse(fs.readFileSync(input,'utf8'))
  const outDir = path.resolve(process.cwd(), 'public', 'sprites', 'svg')
  ensureDir(outDir)
  Object.keys(defs).forEach(id => {
    const def = defs[id]
    const name = def.name ? def.name.replace(/\W+/g,'_') : id
    // choose palette by type list if provided
    const type = (def.types && def.types[0]) || 'fire'
    const palette = {
      fire: ['#FF6A00','#FF8C00','#FFB74D','#FFD54F'],
      water: ['#4FC3F7','#29B6F6','#90CAF9','#B3E5FC'],
      nature: ['#66BB6A','#43A047','#81C784','#A5D6A7'],
      earth: ['#8D6E63','#795548','#A1887F','#D7CCC8'],
      poison: ['#7E57C2','#AB47BC','#CE93D8','#E1BEE7'],
      magic: ['#EC407A','#F48FB1','#F06292','#F8BBF3'],
      psycho: ['#5C6BC0','#7E57C2','#BA68C8','#CE93D8'],
      ice: ['#90CAF9','#BBDEFB','#E1F5FE','#B3E5FC'],
      // default
      default: ['#9E9E9E','#607D8B','#90A4AE']
    }
    const pal = palette[type] || palette.default
    const svg = toSvg(id, pal)
    fs.writeFileSync(ensureSvgPath(outDir, name), svg, 'utf8')
  })
  console.log('Sprites SVG generati')
}

main()
