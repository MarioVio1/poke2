#!/usr/bin/env python3
"""
Download building sprites from PokeAPI/GitHub
"""
import os
import urllib.request
import json

BUILDING_SPRITES = {
    # Case venete
    'house_wood': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
    'house_stone': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/68.svg',
    
    # Edifici speciali
    'pokemon_center': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/50.svg',
    'gym': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/106.svg',
    'lab': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/89.svg',
    'shop': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/131.svg',
    'tower': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/203.svg',
    'cave': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/95.svg',
    'ruins': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/138.svg',
    'lake': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/116.svg',
    
    # Ponti e canali
    'bridge': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
    'water': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/134.svg',
    'boat': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/129.svg',
}

def main():
    base = r"G:\baxk\poke-main"
    outdir = os.path.join(base, 'public', 'sprites', 'buildings')
    os.makedirs(outdir, exist_ok=True)
    
    for name, url in BUILDING_SPRITES.items():
        try:
            path = os.path.join(outdir, f"{name}.png")
            if os.path.exists(path):
                print(f"Skip {name}")
                continue
            urllib.request.urlretrieve(url, path)
            print(f"Downloaded {name}")
        except Exception as e:
            print(f"Error {name}: {e}")
    
    print("Fatto!")

if __name__ == '__main__':
    main()