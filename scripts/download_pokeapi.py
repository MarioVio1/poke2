#!/usr/bin/env python3
"""
Download sprites from PokeAPI and map them to Besti
"""
import os
import urllib.request
import json

# Map Besti names to Pokemon IDs from PokeAPI
# This gives nice pixel-art style sprites
BESTI_TO_POKEMON = {
    # Starters - Fire
    'fogaron': 4,       # Charmander
    'fogarox': 5,      # Charmeleon
    'fogarion': 6,     # Charizard
    
    # Starters - Nature  
    'radiccor': 1,     # Bulbasaur
    'radicorso': 2,    # Ivysaur
    'radicthron': 3,   # Venusaur
    
    # Starters - Water
    'canalot': 7,      # Squirtle
    'canalisk': 8,     # Wartortle
    'canalord': 9,     # Blastoise
    
    # Others
    'gabbianzo': 17,   # Pidgey
    'gabbianator': 18, # Pidgeot
    
    'polentaur': 27,   # Sandshrew
    'polentitan': 28, # Sandslash
    
    'spritzino': 43,   # Oddish
    'spritzilla': 45,  # Vileplume
    
    'gondolo': 54,     # Psyduck
    'gondrago': 55,    # Golduck
    
    'salamix': 60,     # Poliwag
    'salamastro': 62,  # Poliwrath
    
    'prosecchino': 102, # Exeggcute
    'prosecchione': 103, # Exeggutor
    
    'mascarin': 96,    # Drowzee
    'mascarion': 122,  # MrMime
    
    'vespolo': 165,    # Ledyba
    'vespatron': 166,  # Ledian
    
    'nevelet': 87,     # Dewgong
    'dolomor': 131,    # Lapras
    
    'alpibex': 45,     # Vileplume (use as base)
    'dolomibex': 46,   # Parasect
    
    'lagunello': 90,   # Shellder
    'lagunaga': 91,    # Cloyster
    
    'smogatto': 109,   # Koffing
    'fumigor': 110,    # Weezing
    
    'colombo': 21,    # Spearow
    'colombarion': 22, # Fearow
    
    'tiramisu': 35,   # Clefairy
    'tiramisuper': 36, # Clefable
    
    'vignel': 1,      # Bulbasaur
    'vignarbor': 2,   # Ivysaur
    
    'formaggion': 41,  # Zubat
    'parmageddon': 42, # Golbat
    
    'focacino': 126,  # Magmar
    'scampetto': 116, # Horsea
    'risotto': 117,   # Seadra
    
    'porchetta': 50,  # Diglett
    'spritzatore': 60, # Poliwag
    'bacaro': 133,    # Eevee
    'topogranchio': 98, # Krabby
    'fantasma': 72,   # Tentacool
    'fiore': 43,      # Oddish
    
    # Legendaries
    'dolomitor': 144,  # Articuno
    'lagorion': 149,  # Dragonite
    'serenissima': 151, # Mew
    'ombradspritz': 89, # Muk
    'dux': 150,       # Mewtwo
}

BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

def main():
    base = r"G:\baxk\poke-main"
    outdir = os.path.join(base, 'public', 'sprites', 'pngs')
    os.makedirs(outdir, exist_ok=True)
    
    downloaded = 0
    
    for besti_name, pokemon_id in BESTI_TO_POKEMON.items():
        # Try different sprite sizes
        urls = [
            f"{BASE_URL}{pokemon_id}.png",
            f"{BASE_URL}other/official-artwork/{pokemon_id}.png",
        ]
        
        for url in urls:
            try:
                filename = os.path.join(outdir, f"{besti_name}.png")
                if os.path.exists(filename):
                    print(f"Skip {besti_name} (exists)")
                    break
                    
                urllib.request.urlretrieve(url, filename)
                print(f"Downloaded {besti_name} (Pokemon #{pokemon_id})")
                downloaded += 1
                break
            except Exception as e:
                continue
        else:
            print(f"Failed: {besti_name}")
    
    print(f"\nTotal downloaded: {downloaded}")

if __name__ == '__main__':
    main()