#!/usr/bin/env python3
import json, os, random
from PIL import Image, ImageDraw

def ensure_dir(p):
    if not os.path.isdir(p):
        os.makedirs(p, exist_ok=True)

# Better color palettes with more colors and variation
def color_palette_for_type(t):
    palettes = {
        'fire': ['#E53935','#FF5722','#FF7043','#FF8A65','#FFAB91','#FFEBEE','#D84315','#BF360C'],
        'water': ['#1976D2','#0288D1','#03A9F4','#4FC3F7','#81D4FA','#B3E5FC','#01579B','#0277BD'],
        'nature': ['#2E7D32','#388E3C','#43A047','#66BB6A','#81C784','#A5D6A7','#1B5E20','#2E7D32'],
        'earth': ['#5D4037','#6D4C41','#795548','#8D6E63','#A1887F','#BCAAA4','#4E342E','#3E2723'],
        'poison': ['#7B1FA2','#8E24AA','#9C27B0','#AB47BC','#BA68C8','#CE93D8','#4A148C','#6A1B9A'],
        'magic': ['#D81B60','#E91E63','#EC407A','#F06292','#F48FB1','#F8BBD0','#AD1457','#C2185B'],
        'psycho': ['#3949AB','#3949AB','#5C6BC0','#7986CB','#9FA8DA','#C5CAE9','#1A237E','#283593'],
        'ice': ['#00ACC1','#00BCD4','#26C6DA','#4DD0E1','#80DEEA','#B2EBF2','#00838F','#006064'],
        'electric': ['#FBC02D','#FDD835','#FFEB3B','#FFF176','#FFF59D','#FFFDE7','#F9A825','#F57F17'],
        'air': ['#78909C','#90A4AE','#B0BEC5','#CFD8DC','#ECEFF1','#607D8B','#546E7A','#455A64'],
        'sweet': ['#FFA000','#FFB300','#FFC107','#FFD54F','#FFE082','#FFF8E1','#FF6F00','#E65100'],
        'dragon': ['#1565C0','#1976D2','#1E88E5','#2196F3','#42A5F5','#64B5F6','#0D47A1','#1565C0'],
        'normal': ['#757575','#9E9E9E','#BDBDBD','#E0E0E0','#F5F5F5','#616161','#424242','#212121'],
    }
    return palettes.get(t, ['#9E9E9E','#757575','#BDBDBD','#E0E0E0','#F5F5F5'])

def create_body(shape, size=64):
    """Create a body shape"""
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    cx, cy = size//2, size//2
    
    if shape == 'round':
        # Circle/oval body
        draw.ellipse([8, 12, size-8, size-4], fill=(255,255,255,255))
    elif shape == 'tall':
        # Tall body
        draw.rectangle([16, 4, 48, 60], fill=(255,255,255,255))
    elif shape == 'wide':
        # Wide body
        draw.ellipse([4, 20, size-4, 52], fill=(255,255,255,255))
    elif shape == 'blob':
        # Blob shape
        draw.ellipse([10, 15, size-10, size-10], fill=(255,255,255,255))
    elif shape == 'diamond':
        # Diamond shape
        points = [(32, 4), (60, 32), (32, 60), (4, 32)]
        draw.polygon(points, fill=(255,255,255,255))
    elif shape == 'fire':
        # Flame shape
        draw.polygon([(32, 4), (48, 30), (40, 30), (56, 60), (32, 44), (8, 60), (24, 30), (16, 30)], fill=(255,255,255,255))
    elif shape == 'water':
        # Wave shape
        draw.ellipse([8, 16, 56, 48], fill=(255,255,255,255))
    elif shape == 'leaf':
        # Leaf shape
        draw.ellipse([16, 8, 48, 56], fill=(255,255,255,255))
    
    return img

def add_details(draw, shape, cx, cy, size):
    """Add eyes and mouth details"""
    eye_color = (30, 30, 30, 255)
    # Eyes
    draw.ellipse([cx-14, cy-8, cx-6, cy], fill=eye_color)
    draw.ellipse([cx+6, cy-8, cx+14, cy], fill=eye_color)
    # Eye shine
    draw.ellipse([cx-12, cy-6, cx-8, cy-2], fill=(255,255,255,255))
    draw.ellipse([cx+8, cy-6, cx+12, cy-2], fill=(255,255,255,255))
    
    # Mouth based on shape
    if shape in ['fire', 'wide']:
        draw.arc([cx-8, cy+4, cx+8, cy+12], 0, 180, fill=eye_color, width=2)
    elif shape in ['round', 'blob']:
        draw.arc([cx-10, cy+6, cx+10, cy+14], 0, 180, fill=eye_color, width=2)
    else:
        draw.line([cx-6, cy+8, cx+6, cy+8], fill=eye_color, width=2)

def generate_besti_sprite(name, besti_type, evolution_stage=0, size=64):
    """Generate a more detailed sprite based on type and evolution"""
    
    colors = color_palette_for_type(besti_type)
    
    # Determine body shape based on type
    type_to_shape = {
        'fire': 'fire',
        'water': 'water', 
        'nature': 'leaf',
        'dragon': 'wide',
        'poison': 'blob',
        'magic': 'round',
        'psycho': 'tall',
        'ice': 'wide',
        'electric': 'tall',
        'air': 'wide',
        'sweet': 'round',
        'earth': 'wide',
        'normal': 'round'
    }
    
    shape = type_to_shape.get(besti_type, 'round')
    
    # For evolved forms, make them bigger/brighter
    if evolution_stage >= 2:
        colors = colors[:4]  # Brighter colors for evolved
    elif evolution_stage == 0:
        colors = colors[4:]  # Softer for base forms
    
    # Create base image
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size//2, size//2
    
    # Fill with gradient-like colors (simplified)
    seed = sum(ord(c) for c in name)
    rnd = random.Random(seed)
    
    # Draw body with color variation
    for i, color in enumerate(colors):
        if shape == 'round':
            margin = 8 + i*2
            draw.ellipse([margin, margin+4, size-margin, size-margin-4], fill=color)
        elif shape == 'wide':
            margin = 4 + i*3
            draw.ellipse([margin, 16+i, size-margin, size-16-i], fill=color)
        elif shape == 'tall':
            margin = 12 + i*2
            draw.rectangle([margin, 4+i, size-margin, size-4-i], fill=color)
        elif shape == 'fire':
            # Draw flames at bottom, reduce size with each layer
            if i < 4:
                h = size//2 + i*4
                draw.ellipse([8+i*2, h, size-8-i*2, size-4], fill=color)
        elif shape == 'water':
            margin = 6 + i*2
            draw.ellipse([margin, 14+i, size-margin, size-14-i], fill=color)
        elif shape == 'leaf':
            margin = 10 + i*2
            draw.ellipse([margin, 6+i, size-margin, size-6-i], fill=color)
        else:
            margin = 6 + i*2
            draw.ellipse([margin, margin+4, size-margin, size-margin-4], fill=color)
    
    # Add details
    add_details(draw, shape, cx, cy, size)
    
    # Add highlight/shine
    highlight_color = (255, 255, 255, 100)
    draw.ellipse([cx-20, cy-15, cx-10, cy-10], fill=highlight_color)
    
    return img

def main():
    base = r"G:\baxk\poke-main"
    data_path = os.path.join(base, 'data', 'besti_sprite_defs.json')
    with open(data_path, 'r', encoding='utf-8') as f:
        defs = json.load(f)
    
    outdir = os.path.join(base, 'public', 'sprites', 'pngs')
    ensure_dir(outdir)
    
    # Evolution tracking
    evo_stages = {
        'fogaron': 0, 'fogarox': 1, 'fogarion': 2,
        'radiccor': 0, 'radicorso': 1, 'radicthron': 2,
        'canalot': 0, 'canalisk': 1, 'canalord': 2,
        'gabbianzo': 0, 'gabbianator': 1,
        'polentaur': 0, 'polentitan': 1,
        'spritzino': 0, 'spritzilla': 1,
        'gondolo': 0, 'gondrago': 1,
        'salamix': 0, 'salamastro': 1,
        'prosecchino': 0, 'prosecchione': 1,
        'mascarin': 0, 'mascarion': 1,
        'vespolo': 0, 'vespatron': 1,
        'nevelet': 0, 'dolomor': 1,
        'alpibex': 0, 'dolomibex': 1,
        'lagunello': 0, 'lagunaga': 1,
        'smogatto': 0, 'fumigor': 1,
        'colombo': 0, 'colombarion': 1,
        'tiramisu': 0, 'tiramisuper': 1,
        'vignel': 0, 'vignarbor': 1,
        'formaggion': 0, 'parmageddon': 1,
    }
    
    for key, defn in defs.items():
        name = defn.get('name', key)
        t = (defn.get('types') or ['default'])[0]
        evo = evo_stages.get(key, 0)
        
        img = generate_besti_sprite(name, t, evo, 64)
        
        # Clean filename
        clean_name = name.lower().replace(' ', '').replace("'", '').replace('-', '')
        path_out = os.path.join(outdir, clean_name + '.png')
        img.save(path_out, 'PNG')
        print(f'Generated {clean_name}.png ({t})')

if __name__ == '__main__':
    main()