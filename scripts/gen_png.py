#!/usr/bin/env python3
import sys
import json, os, random
from PIL import Image, ImageDraw

def ensure_dir(p):
    if not os.path.isdir(p):
        os.makedirs(p, exist_ok=True)

def color_palette_for_type(t):
    palettes = {
        'fire': ['#FF6A00','#FF8C00','#FFB74D','#FFD54F'],
        'water': ['#4FC3F7','#29B6F6','#90CAF9','#B3E5FC'],
        'nature': ['#66BB6A','#43A047','#81C784','#A5D6A7'],
        'earth': ['#8D6E63','#795548','#A1887F','#D7CCC8'],
        'poison': ['#7E57C2','#AB47BC','#CE93D8','#E1BEE7'],
        'magic': ['#EC407A','#F06292','#BA68C8','#E1BEE7'],
        'psycho': ['#5C6BC0','#7E57C2','#BA68C8','#CE93D8'],
        'ice': ['#90CAF9','#BBDEFB','#E1F5FE','#B3E5FC'],
    }
    return palettes.get(t, ['#9E9E9E','#607D8B','#90A4AE'])

def generate_image(name, colors, size=64):
    block = 8
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    seed = sum(ord(c) for c in name)
    rnd = random.Random(seed)
    for gy in range(size // block):
        for gx in range(size // block):
            if rnd.random() < 0.5:
                color = rnd.choice(colors)
                x0, y0 = gx * block, gy * block
                draw.rectangle([x0, y0, x0+block-1, y0+block-1], fill=color)
    return img

def main():
    base = r"G:\baxk\poke-main"
    data_path = os.path.join(base, 'data', 'besti_sprite_defs.json')
    with open(data_path, 'r', encoding='utf-8') as f:
        defs = json.load(f)
    outdir = os.path.join(base, 'public', 'sprites', 'pngs')
    ensure_dir(outdir)
    for key, defn in defs.items():
        name = defn.get('name', key)
        t = (defn.get('types') or ['default'])[0]
        colors = color_palette_for_type(t)
        img = generate_image(name, colors, 64)
        path_out = os.path.join(outdir, name.lower() + '.png')
        img.save(path_out, 'PNG')
        print('Generated', path_out)

if __name__ == '__main__':
    main()