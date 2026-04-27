// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER CHARACTERS - Personaggi per ogni capitolo del gioco
// ═══════════════════════════════════════════════════════════════════════════════

export interface ChapterCharacter {
  id: string
  name: string
  role: 'mentor' | 'rival' | 'ally' | 'enemy' | 'npc'
  chapter: number
  location: string
  firstMeet: string
  dialog: ChapterDialog[]
  battle?: { besti: string[]; lvl: number }
  give?: { item: string; quest?: string }
}

export interface ChapterDialog {
  text: string
  emotion?: 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'confused'
  requires?: string
}

export const CHAPTER_CHARACTERS: ChapterCharacter[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 0: Il Risveglio (Canalborgo)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'mamma_chiara',
    name: 'Mamma Chiara',
    role: 'mentor',
    chapter: 0,
    location: 'casa',
    firstMeet: 'casa',
    dialog: [
      { text: "Tesoro! Ti sei svegliato alla fine!", emotion: 'happy' },
      { text: "Oggi è il grande giorno! Vai dal Professor Barcaro!", emotion: 'excited' },
      { text: "Prendi questo - è il tuo primo Besti!", emotion: 'happy' },
      { text: "La polenta è sempre la risposta... ma prima allenati!", emotion: 'neutral' },
    ],
    give: { item: 'pokedex' }
  },
  {
    id: 'vicino_umberto',
    name: 'Vicino Umberto',
    role: 'npc',
    chapter: 0,
    location: 'canalborgo',
    firstMeet: 'canalborgo',
    dialog: [
      { text: "Oi belòto! Sei il nuovo trainer?", emotion: 'happy' },
      { text: "Te recomendogo el professor Barcaro! Fa el melhor besti!", emotion: 'neutral' },
      { text: "Atento ai gabbiani! So più forti de quel che par!", emotion: 'confused' },
    ]
  },
  {
    id: 'bambino_paver',
    name: 'Paolino',
    role: 'npc',
    chapter: 0,
    location: 'canalborgo',
    firstMeet: 'canalborgo',
    dialog: [
      { text: "Anche ti te gheti a cercar besti?!", emotion: 'excited' },
      { text: "Io gò già el mio! El pì forte!", emotion: 'happy' },
      { text: "Ma no te lo mostro! XE SEGRETO!", emotion: 'angry' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 1: La Scelta del Destino (Laboratorio)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'prof_barcaro',
    name: 'Prof. Barcaro',
    role: 'mentor',
    chapter: 1,
    location: 'laboratorio',
    firstMeet: 'laboratorio',
    dialog: [
      { text: "BENVENUTO! So el Professor Barcaro!", emotion: 'happy' },
      { text: "Studio i Besti da 40 anni! XE TANTISSIMI!", emotion: 'excited' },
      { text: "Oggi tedarò uno dei 4 BESTI LEGGENDARI!", emotion: 'excited' },
      { text: "Scegli con il cuore... e con la pancia!", emotion: 'neutral' },
    ],
    give: { item: 'starter_choice' }
  },
  {
    id: 'marco_rival',
    name: 'Marco',
    role: 'rival',
    chapter: 1,
    location: 'laboratorio',
    firstMeet: 'laboratorio',
    dialog: [
      { text: "EHI! CI SONO ANCHE IO!", emotion: 'angry' },
      { text: "So el to rivale! E prendo el miglior!", emotion: 'happy' },
      { text: "Te sarò sempre d'avanti... SEMPRE!", emotion: 'angry' },
      { text: "Ci vedremo in strada,belòto!", emotion: 'neutral' },
    ],
    battle: { besti: ['radiccor', 'fogaron', 'canalot', 'spritzino'], lvl: 5 }
  },

  // ═══════════════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 2: Il Primo Passo (Canalborgo -> Route1)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: ' pizzaiolo_mauro',
    name: 'Mauro Pizzard',
    role: 'npc',
    chapter: 2,
    location: 'route1',
    firstMeet: 'route1',
    dialog: [
      { text: "PIZZZAAA! Calda e filante!", emotion: 'happy' },
      { text: "Ho sbagliato strada... de novo!", emotion: 'confused' },
      { text: "Te laredo! Par to pare!", emotion: 'neutral' },
    ]
  },
  {
    id: 'pescatore_tonio',
    name: 'Tonio Pescatore',
    role: 'npc',
    chapter: 2,
    location: 'route1',
    firstMeet: 'route1',
    dialog: [
      { text: "Xe 50 ani che peso e no go mai ciapà niente!", emotion: 'sad' },
      { text: "Ma doman... doman xe el giorno!", emotion: 'excited' },
      { text: "Te consiglio: vai al centro besti!", emotion: 'happy' },
    ],
    give: { item: 'polenta_xl' }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 3: Spritzia (Gym Aperitivo)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'bepi_spritzaro',
    name: 'Bepi lo Spritzaro',
    role: 'enemy',
    chapter: 3,
    location: 'gym_spritzia',
    firstMeet: 'spritzia',
    dialog: [
      { text: "CHE BEVEMO OGGI?! Sono el leader!", emotion: 'happy' },
      { text: "Se vuoi el mio Badge, devi BATTERMI!", emotion: 'angry' },
      { text: "MA PRIMA... un aperitivo!", emotion: 'happy' },
      { text: "Hai vinto?! XE IMPOSSIBILE!", emotion: 'sad' },
    ],
    battle: { besti: ['spritzino', 'spritzilla'], lvl: 14 },
    give: { item: 'badge_aperitivo' }
  },
  {
    id: 'barista_luca',
    name: 'Barista Luca',
    role: 'npc',
    chapter: 3,
    location: 'spritzia',
    firstMeet: 'spritzia',
    dialog: [
      { text: "Oi, bela! Cosa te porte?", emotion: 'happy' },
      { text: "El Spritz? El pusì bello! XE FATO MIE!", emotion: 'excited' },
      { text: "Te consiglio el Spritz allogger! De 5 euro!", emotion: 'neutral' },
    ]
  },
  {
    id: ' DJ_spritz',
    name: 'DJ Spritz',
    role: 'npc',
    chapter: 3,
    location: 'spritzia',
    firstMeet: 'spritzia',
    dialog: [
      { text: "TRANCE! TRANCE! TRANCE!", emotion: 'excited' },
      { text: "La mùsica xe bona, no?!", emotion: 'happy' },
      { text: "Ma el volume... XE TROPO ALTO!", emotion: 'angry' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 4: La Minaccia della Polenta (Route2)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'grint_polenta_1',
    name: 'Grint dela Polenta',
    role: 'enemy',
    chapter: 4,
    location: 'route2',
    firstMeet: 'route2',
    dialog: [
      { text: "ALTO LÀ! Sei nel nostro territorio!", emotion: 'angry' },
      { text: "VOGLIAMO la polenta perfetta!", emotion: 'angry' },
      { text: "Ti faresemo配料!", emotion: 'confused' },
      { text: "XEI VINTO?! COME?!", emotion: 'sad' },
    ],
    battle: { besti: ['polentaur', 'polentitan'], lvl: 16 }
  },
  {
    id: 'contadino_bepi',
    name: 'Contadino Bepi',
    role: 'ally',
    chapter: 4,
    location: 'route2',
    firstMeet: 'route2',
    dialog: [
      { text: "Aiuto! Questi cattivi me ga rubà el radicchio!", emotion: 'sad' },
      { text: "Te se forte! Te帮我!", emotion: 'happy' },
      { text: "Tieni! XEl to premio!", emotion: 'happy' },
    ],
    give: { item: 'radicchio', quest: 'save_farmer' }
  },
  {
    id: 'grint_polenta_2',
    name: 'Capo Grint',
    role: 'enemy',
    chapter: 4,
    location: 'route2',
    firstMeet: 'route2',
    dialog: [
      { text: "Tu... te recordo!", emotion: 'angry' },
      { text: "La COMPAGNIA no forgetsce!", emotion: 'neutral' },
      { text: "MA EL NOSTRO potere xe INFINITO!", emotion: 'excited' },
      { text: "No... xe impossibile...!", emotion: 'sad' },
    ],
    battle: { besti: ['polentitan', 'parmageddon'], lvl: 18 }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 5: Veronara (Gym Arena)
  // ═══════════════════════════════════════════════════════════════════════════════════════
  {
    id: 'giuliano_arena',
    name: 'Giuliano Arena',
    role: 'enemy',
    chapter: 5,
    location: 'gym_veronara',
    firstMeet: 'veronara',
    dialog: [
      { text: "BENVENUTO NELL'ARENA!", emotion: 'happy' },
      { text: "So Giuliano! Combatto con ONORE!", emotion: 'excited' },
      { text: "Se perdi... no te ghè vissù l'amor!", emotion: 'neutral' },
      { text: "Hai vinto?! XE INCREDBILE!", emotion: 'sad' },
    ],
    battle: { besti: ['gabbianator', 'lagunaga', 'gondrago'], lvl: 22 },
    give: { item: 'badge_arena' }
  },
  {
    id: 'giulietta',
    name: 'Giulietta',
    role: 'npc',
    chapter: 5,
    location: 'veronara',
    firstMeet: 'veronara',
    dialog: [
      { text: "Oi belòto! Cerchi el to amor?", emotion: 'happy' },
      { text: "El mio Giuliano? Xe el pì forte!", emotion: 'happy' },
      { text: "Ma el to Besti? Xe proprio bel!", emotion: 'excited' },
    ]
  },
  {
    id: 'romeo_wannabe',
    name: 'Romeo de Mestrina',
    role: 'npc',
    chapter: 5,
    location: 'veronara',
    firstMeet: 'veronara',
    dialog: [
      { text: "Te jeri la mia Giuglielmeta?!", emotion: 'confused' },
      { text: "No?! Allora... chi te?!", emotion: 'sad' },
      { text: "Vado sul балкон...", emotion: 'neutral' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 6: Padoana (Università)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'sansovino',
    name: 'Prof. Sansovino',
    role: 'mentor',
    chapter: 6,
    location: 'padoana',
    firstMeet: 'padoana',
    dialog: [
      { text: "BENVENUTO, giovane studioso!", emotion: 'happy' },
      { text: "Devo racontarti una STORIA...", emotion: 'neutral' },
      { text: "Quella che la Polenta NO vole...", emotion: 'sad' },
      { text: "Xe tutto collegà! Tutto!", emotion: 'confused' },
    ]
  },
  {
    id: 'studente_zanetti',
    name: 'Studente Zanetti',
    role: 'npc',
    chapter: 6,
    location: 'padoana',
    firstMeet: 'padoana',
    dialog: [
      { text: "Oi! Anche ti al'università?!", emotion: 'happy' },
      { text: "El Prof. Sansovino? Xe un GENIO!", emotion: 'excited' },
      { text: "Ma no se capisse gnente!", emotion: 'confused' },
    ]
  },
  {
    id: 'rettore_bruno',
    name: 'Rettore Bruno',
    role: 'enemy',
    chapter: 6,
    location: 'gym_padoana',
    firstMeet: 'gym_padoana',
    dialog: [
      { text: "NEL MIO ATENEO!", emotion: 'angry' },
      { text: "Sei nur una! STUDENTE!", emotion: 'neutral' },
      { text: "Ma la verità... XE PERICOLOSA!", emotion: 'sad' },
      { text: "Hai... vinto?! Allora... sei.ready!", emotion: 'confused' },
    ],
    battle: { besti: ['mascarin', 'mascarion', 'prosecchione'], lvl: 26 },
    give: { item: 'badge_studio' }
  },

  // ═══════════════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 7: Trevisella (Radicchio)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'nonno_gino',
    name: 'Nonno Gino',
    role: 'mentor',
    chapter: 7,
    location: 'trevisella',
    firstMeet: 'trevisella',
    dialog: [
      { text: "Oh, giovane! Il mio radicchio...!", emotion: 'sad' },
      { text: "Senza el RADICCIO DORATO... no posso!", emotion: 'sad' },
      { text: "Ma tu... te ghè la forza!", emotion: 'happy' },
      { text: "Vai! Trovalo! XE LA!", emotion: 'excited' },
    ]
  },
  {
    id: 'nonna_gina',
    name: 'Nonna Gina',
    role: 'enemy',
    chapter: 7,
    location: 'gym_trevisella',
    firstMeet: 'gym_trevisella',
    dialog: [
      { text: "Ho eredità la forza! Combattimi!", emotion: 'happy' },
      { text: "El radicchio? XELA MIA VITA!", emotion: 'excited' },
      { text: "So più forte de mi'omo!", emotion: 'angry' },
      { text: "Hai vinto?! Bela! Bela!", emotion: 'sad' },
    ],
    battle: { besti: ['radicthron', 'vignarbor', 'salamastro'], lvl: 30 },
    give: { item: 'badge_radicchio' }
  },
  {
    id: 'trevisano_1',
    name: 'Trevisano',
    role: 'npc',
    chapter: 7,
    location: 'trevisella',
    firstMeet: 'trevisella',
    dialog: [
      { text: "Oi! Cerchi el radicchio?", emotion: 'happy' },
      { text: "L'è da queste parti... FORSE!", emotion: 'confused' },
      { text: "Ma sta attento! XE PERICOLOSO!", emotion: 'angry' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 8: Dolomax (Ghiaccio)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'regina_ghiacci',
    name: 'Regina Ghiacci',
    role: 'enemy',
    chapter: 8,
    location: 'gym_dolomax',
    firstMeet: 'dolomax',
    dialog: [
      { text: "IL FREDDO XE MIO ALLEATO!", emotion: 'angry' },
      { text: "Solo i più forti possono passare!", emotion: 'neutral' },
      { text: "Nella grotta... dorme DOLOMITOR!", emotion: 'sad' },
      { text: "No... El Freddo... no pù...", emotion: 'sad' },
    ],
    battle: { besti: ['dolomitor', 'nevelet', 'dolomor'], lvl: 34 },
    give: { item: 'badge_ghiaccio' }
  },
  {
    id: 'alpinista_mario',
    name: 'Mario Alpina',
    role: 'npc',
    chapter: 8,
    location: 'dolomax',
    firstMeet: 'dolomax',
    dialog: [
      { text: "Oi! Belle le montagne?!", emotion: 'happy' },
      { text: "El picos? Xe el pì alto!", emotion: 'excited' },
      { text: "Ma el freddo... XE FORTE!", emotion: 'confused' },
    ]
  },
  {
    id: 'guardia_neve',
    name: 'Guardia Neve',
    role: 'enemy',
    chapter: 8,
    location: 'dolomax',
    firstMeet: 'dolomax',
    dialog: [
      { text: "NON PASSI! XE IL MIO POSTO!", emotion: 'angry' },
      { text: "La Regina me ga mandà!", emotion: 'neutral' },
      { text: "Ma... sei trop forte!", emotion: 'sad' },
    ],
    battle: { besti: ['dolomibex', 'alpibex'], lvl: 32 }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 9: Gardalago (Elite Four)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'maestro_marco',
    name: 'Maestro Marco',
    role: 'rival',
    chapter: 9,
    location: 'gardalago',
    firstMeet: 'gardalago',
    dialog: [
      { text: "AH! Il giovane che ga sconfitto la Polenta!", emotion: 'neutral' },
      { text: "Per battermi... te serve TUTTO!", emotion: 'excited' },
      { text: "XEI IL MIO MOMENTO!", emotion: 'angry' },
      { text: "Hai vinto?!... BELOŁO!", emotion: 'sad' },
    ],
    battle: { besti: ['fogarion', 'radicthron', 'canalord', 'lagorion'], lvl: 40 }
  },
  {
    id: 'elite_fire',
    name: 'Elite Fuoco',
    role: 'enemy',
    chapter: 9,
    location: 'league',
    firstMeet: 'league',
    dialog: [
      { text: "FIRST: IL FUOCOSO!", emotion: 'happy' },
      { text: "El fuoco? XE la MIA VITA!", emotion: 'excited' },
      { text: "Ma xe troppocaldo...!", emotion: 'sad' },
    ],
    battle: { besti: ['fogarion', 'fogarox', 'fogaron'], lvl: 38 }
  },
  {
    id: 'elite_water',
    name: 'Elite Acqua',
    role: 'enemy',
    chapter: 9,
    location: 'league',
    firstMeet: 'league',
    dialog: [
      { text: "L'ACQUA xe infinà!", emotion: 'happy' },
      { text: "Ti诺 maso via...!", emotion: 'confused' },
      { text: "Ma el to Besti? XE tropo forte!", emotion: 'sad' },
    ],
    battle: { besti: ['canalord', 'canalisk', 'canalot'], lvl: 38 }
  },
  {
    id: 'elite_earth',
    name: 'Elite Terra',
    role: 'enemy',
    chapter: 9,
    location: 'league',
    firstMeet: 'league',
    dialog: [
      { text: "La TERRA so mia!", emotion: 'angry' },
      { text: "El podeR? xe infinito!", emotion: 'excited' },
      { text: "Ma... xe spaccà...", emotion: 'sad' },
    ],
    battle: { besti: ['radicthron', 'polentitan', 'polentaur'], lvl: 38 }
  },
  {
    id: 'elite_magic',
    name: 'Elite Magia',
    role: 'enemy',
    chapter: 9,
    location: 'league',
    firstMeet: 'league',
    dialog: [
      { text: "LA MAGIAxe tutto!", emotion: 'excited' },
      { text: "Te leggo... nel futuro!", emotion: 'confused' },
      { text: "Ma el futuro? XE INCERTO!", emotion: 'sad' },
    ],
    battle: { besti: ['spritzilla', 'serenissima', 'mascarion'], lvl: 38 }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAPITOLO 10: L'Epilogo (Base Polenta)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'dux_polenta',
    name: 'Dux Polenta',
    role: 'enemy',
    chapter: 10,
    location: 'base_polenta',
    firstMeet: 'base_polenta',
    dialog: [
      { text: "BENVENUTO, GIOVANE...", emotion: 'angry' },
      { text: "Ora xe FINITA!", emotion: 'angry' },
      { text: "LA MIA POLENTA... XE PERFETA!", emotion: 'excited' },
      { text: "NO!..XE IMPOSSIBILE!...", emotion: 'sad' },
    ],
    battle: { besti: ['dux', 'serenissima', 'lagorion', 'dolomitor'], lvl: 45 }
  },
  {
    id: 'mamma_chiara_final',
    name: 'Mamma Chiara',
    role: 'ally',
    chapter: 10,
    location: 'victory',
    firstMeet: 'victory',
    dialog: [
      { text: "Te sì forte! Sono fiera!", emotion: 'happy' },
      { text: "La polenta xe con ti!", emotion: 'excited' },
      { text: "Sei il mio CAMPIONE!", emotion: 'happy' },
    ]
  },
  {
    id: 'prof_barcaro_final',
    name: 'Prof. Barcaro',
    role: 'mentor',
    chapter: 10,
    location: 'victory',
    firstMeet: 'victory',
    dialog: [
      { text: "Ho sempre credù in ti!", emotion: 'happy' },
      { text: "I Besti? SO TUTTI Speciali!", emotion: 'excited' },
      { text: "Ora... sei un LEGGENDA!", emotion: 'happy' },
    ]
  },
]

export function getChapterCharacters(chapter: number): ChapterCharacter[] {
  return CHAPTER_CHARACTERS.filter(c => c.chapter === chapter)
}

export function getCharacterById(id: string): ChapterCharacter | undefined {
  return CHAPTER_CHARACTERS.find(c => c.id === id)
}

export function getCharactersByLocation(location: string): ChapterCharacter[] {
  return CHAPTER_CHARACTERS.filter(c => c.location === location)
}