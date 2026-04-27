#!/usr/bin/env python3
import os
import urllib.request

BESTI_TO_POKEMON = {
    'fogaron': 4, 'fogarox': 5, 'fogarion': 6,
    'radiccor': 1, 'radicorso': 2, 'radicthron': 3,
    'canalot': 7, 'canalisk': 8, 'canalord': 9,
    'gabbianzo': 17, 'gabbianator': 18,
    'polentaur': 27, 'polentitan': 28,
    'spritzino': 43, 'spritzilla': 45,
    'gondolo': 54, 'gondrago': 55,
    'salamix': 60, 'salamastro': 62,
    'prosecchino': 102, 'prosecchione': 103,
    'mascarin': 96, 'mascarion': 122,
    'vespolo': 165, 'vespatron': 166,
    'nevelet': 87, 'dolomor': 131,
    'alpibex': 45, 'dolomibex': 46,
    'lagunello': 90, 'lagunaga': 91,
    'smogatto': 109, 'fumigor': 110,
    'colombo': 21, 'colombarion': 22,
    'tiramisu': 35, 'tiramisuper': 36,
    'vignel': 1, 'vignarbor': 2,
    'formaggion': 41, 'parmageddon': 42,
    'focacino': 126, 'scampetto': 116,
    'risotto': 117, 'porchetta': 50,
    'spritzatore': 60, 'bacaro': 133,
    'topogranchio': 98, 'fantasma': 72,
    'fiore': 43,
    'dolomitor': 144, 'lagorion': 149,
    'serenissima': 151, 'ombradspritz': 89,
    'dux': 150,
}

URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{}.png"
OUT = r"G:\baxk\poke-main\public\sprites\pngs"

for name, pid in BESTI_TO_POKEMON.items():
    try:
        path = os.path.join(OUT, f"{name}.png")
        if os.path.exists(path):
            print(f"Skip {name}")
            continue
        urllib.request.urlretrieve(URL.format(pid), path)
        print(f"OK: {name} <- Pokemon #{pid}")
    except Exception as e:
        print(f"ERR: {name} - {e}")

print("Fatto!")