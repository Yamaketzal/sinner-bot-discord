/**
 * Albion Online Database
 * Contains weapons, armor, zones, and their Tier 8 images
 * Image URLs from Albion Online Wiki
 */

// Weapon Categories
const WEAPON_TYPES = {
  // Melee DPS
  SWORD: 'sword',
  AXE: 'axe',
  MACE: 'mace',
  DAGGER: 'dagger',
  SPEAR: 'spear',
  QUARTERSTAFF: 'quarterstaff',
  
  // Ranged DPS
  BOW: 'bow',
  CROSSBOW: 'crossbow',
  
  // Magic DPS
  FIRE_STAFF: 'fire_staff',
  FROST_STAFF: 'frost_staff',
  ARCANE_STAFF: 'arcane_staff',
  CURSE_STAFF: 'curse_staff',
  
  // Tank/Support
  HAMMER: 'hammer',
  NATURE_STAFF: 'nature_staff',
  HOLY_STAFF: 'holy_staff'
}

// Complete Albion Weapons Database with Tier 8 image URLs
const ALBION_WEAPONS = {
  // SWORDS
  'broadsword': {
    name: 'Broadsword',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Broadsword.png',
    emoji: '⚔️'
  },
  'claymore': {
    name: 'Claymore',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Claymore.png',
    emoji: '⚔️'
  },
  'dual-swords': {
    name: 'Dual Swords',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_DUALSWORD.png',
    emoji: '⚔️'
  },
  'clarent-blade': {
    name: 'Clarent Blade',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Clarent%20Blade.png',
    emoji: '⚔️'
  },
  'carving-sword': {
    name: 'Carving Sword',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Carving%20Sword.png',
    emoji: '⚔️'
  },
  'galatine-pair': {
    name: 'Galatine Pair',
    category: 'sword',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Galatine%20Pair.png',
    emoji: '⚔️'
  },

  // AXES
  'battleaxe': {
    name: 'Battleaxe',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Battleaxe.png',
    emoji: '🪓'
  },
  'greataxe': {
    name: 'Greataxe',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_AXE.png',
    emoji: '🪓'
  },
  'halberd': {
    name: 'Halberd',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Halberd.png',
    emoji: '🪓'
  },
  'infernal-scythe': {
    name: 'Infernal Scythe',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_SCYTHE_HELL.png',
    emoji: '🪓'
  },
  'carrioncaller': {
    name: 'Carrioncaller',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Carrioncaller.png',
    emoji: '🪓'
  },
  'bearpaws': {
    name: 'Bearpaws',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Bear%20Paws.png',
    emoji: '🪓'
  },
  'realmbreaker': {
    name: 'Realmbreaker',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Realmbreaker.png',
    emoji: '🪓'
  },
  'crystal-reaper': {
    name: 'Crystal Reaper',
    category: 'axe',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Crystal%20Reaper.png',
    emoji: '🪓'
  },


  // MACES
  'heavy-mace': {
    name: 'Heavy Mace',
    category: 'mace',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/T8_2H_MACE.png',
    emoji: '🔨'
  },
  '1h-mace': {
    name: '1H Mace',
    category: 'mace',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Mace.png',
    emoji: '🔨'
  },
  'bedrock-mace': {
    name: 'Bedrock Mace',
    category: 'mace',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Bedrock%20Mace.png',
    emoji: '🔨'
  },
  'incubus-mace': {
    name: 'Incubus Mace',
    category: 'mace',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Incubus%20Mace.png',
    emoji: '🔨'
  },
  'dreadstorm-monarch': {
    name: 'Dreadstorm Monarch',
    category: 'mace',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Dreadstorm%20Monarch.png',
    emoji: '🔨'
  },


  // DAGGERS
  'dagger-pair': {
    name: 'Dagger Pair',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_DAGGERPAIR.png',
    emoji: '🗡️'
  },
  'claws': {
    name: 'Claws',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_CLAWPAIR.png',
    emoji: '🗡️'
  },
  'bloodletter': {
    name: 'Bloodletter',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Bloodletter.png',
    emoji: '🗡️'
  },
  'deathgivers': {
    name: 'Deathgivers',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Deathgivers.png',
    emoji: '🗡️'
  },
  'demonfang': {
    name: 'Demonfang',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Demonfang.png',
    emoji: '🗡️'
  },
  '1h-dagger': {
    name: '1H Dagger',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Dagger.png',
    emoji: '🗡️'
  },
  'bridled-fury': {
    name: 'Bridled Fury',
    category: 'dagger',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Bridled%20Fury.png',
    emoji: '🗡️'
  },


  // SPEARS
  'pike': {
    name: 'Pike',
    category: 'spear',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_SPEAR.png',
    emoji: '🔱'
  },
  'glaive': {
    name: 'Glaive',
    category: 'spear',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_GLAIVE.png',
    emoji: '🔱'
  },
  'trinity-spear': {
    name: 'Trinity Spear',
    category: 'spear',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_HARPOON.png',
    emoji: '🔱'
  },
  'spirithunter': {
    name: 'Spirithunter',
    category: 'spear',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/T8_2H_SPEAR_KEEPER.png',
    emoji: '🔱'
  },
  'heron-spear': {
    name: 'Heron Spear',
    category: 'spear',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Heron%20Spear.png',
    emoji: '🔱'
  },
  'rift-glaive': {
    name: 'Rift Glaive',
    category: 'spear',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Rift%20Glaive.png',
    emoji: '🔱'
  },
  'daybreaker': {
    name: 'Daybreaker',
    category: 'spear',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Daybreaker.png',
    emoji: '🔱'
  },


  // QUARTERSTAFFS
  'iron-clad-staff': {
    name: 'Iron-clad Staff',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_QUARTERSTAFF.png',
    emoji: '☯'
  },
  'double-bladed-staff': {
    name: 'Double Bladed Staff',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_DOUBLEBLADEDSTAFF.png',
    emoji: '☯'
  },
  'black-monk-stave': {
    name: 'Black Monk Stave',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_COMBATSTAFF_MORGANA.png',
    emoji: '☯'
  },
  'soulscythe': {
    name: 'Soulscythe',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_TWINSCYTHE_HELL.png',
    emoji: '☯'
  },
  'staff-of-balance': {
    name: 'Staff of Balance',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Staff%20of%20Balance.png',
    emoji: '☯'
  },
  'grailseeker': {
    name: 'Grailseeker',
    category: 'quarterstaff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Grailseeker.png',
    emoji: '☯'
  },


  // BOWS
  'bow': {
    name: 'Bow',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_BOW.png',
    emoji: '🏹'
  },
  'warbow': {
    name: 'Warbow',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_WARBOW.png',
    emoji: '🏹'
  },
  'bow-of-badon': {
    name: 'Bow of Badon',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_BOW_KEEPER.png',
    emoji: '🏹'
  },
  'mistpiercer': {
    name: 'Mistpiercer',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_BOW_AVALON.png',
    emoji: '🏹'
  },
  'wailing-bow': {
    name: 'Wailing Bow',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_BOW_HELL.png',
    emoji: '🏹'
  },
  'longbow': {
    name: 'Longbow',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Longbow.png',
    emoji: '🏹'
  },
  'whispering-bow': {
    name: 'Whispering Bow',
    category: 'bow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Whispering%20Bow.png',
    emoji: '🏹'
  },

  // CROSSBOWS
  'crossbow': {
    name: 'Crossbow',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_CROSSBOW.png',
    emoji: '🎯'
  },
  'light-crossbow': {
    name: 'Light Crossbow',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Light%20Crossbow.png',
    emoji: '🎯'
  },
  'heavy-crossbow': {
    name: 'Heavy Crossbow',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_CROSSBOWLARGE.png',
    emoji: '🎯'
  },
  'siegebow': {
    name: 'Siegebow',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Siegebow.png',
    emoji: '🎯'
  },
  'boltcasters': {
    name: 'Boltcasters',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Boltcasters.png',
    emoji: '🎯'
  },
  'energy-shaper': {
    name: 'Energy Shaper',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Energy%20Shaper.png',
    emoji: '🎯'
  },
  'weeping-repeater': {
    name: 'Weeping Repeater',
    category: 'crossbow',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Weeping%20Repeater.png',
    emoji: '🎯'
  },



  // FIRE STAFFS
  '1h-fire-staff': {
    name: '1H Fire Staff',
    category: 'fire_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_FIRESTAFF.png',
    emoji: '🔥'
  },
  'infernal-staff': {
    name: 'Infernal Staff',
    category: 'fire_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_INFERNOSTAFF.png',
    emoji: '🔥'
  },
  'blazing-staff': {
    name: 'Blazing Staff',
    category: 'fire_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Blazing%20Staff.png',
    emoji: '🔥'
  },
  'brimstone-staff': {
    name: 'Brimstone Staff',
    category: 'fire_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_FIRESTAFF_HELL.png',
    emoji: '🔥'
  },
  'dawnsong': {
    name: 'Dawnsong',
    category: 'fire_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Dawnsong.png',
    emoji: '🔥'
  },

  // FROST STAFFS
  '1h-frost-staff': {
    name: '1H Frost Staff',
    category: 'frost_staff',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_FROSTSTAFF.png',
    emoji: '❄️'
  },
  'glacial-staff': {
    name: 'Glacial Staff',
    category: 'frost_staff',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/T8_2H_GLACIALSTAFF.png',
    emoji: '❄️'
  },
  'hoarfrost-staff': {
    name: 'Hoarfrost Staff',
    category: 'frost_staff',
    role: 'support',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Hoarfrost%20Staff.png',
    emoji: '❄️'
  },
  'icicle-staff': {
    name: 'Icicle Staff',
    category: 'frost_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_ICEGAUNTLETS_HELL.png',
    emoji: '❄️'
  },
  'permafrost-prism': {
    name: 'Permafrost',
    category: 'frost_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_ICECRYSTAL_UNDEAD.png',
    emoji: '❄️'
  },
  'great-frost-staff': {
    name: 'Great Frost Staff',
    category: 'frost_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Great%20Frost%20Staff.png',
    emoji: '❄️'
  },
  'arctic-staff': {
    name: 'Arctic Staff',
    category: 'frost_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Arctic%20Staff.png',
    emoji: '❄️'
  },
  'chillhowl': {
    name: 'Chillhowl',
    category: 'frost_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Chillhowl.png',
    emoji: '❄️'
  },

  // ARCANE STAFFS
  'great-arcane-staff': {
    name: 'Great Arcane Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Great%20Arcane%20Staff.png',
    emoji: '✨'
  },
  '1h-arcane-staff': {
    name: '1H Arcane Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_ARCANESTAFF.png',
    emoji: '✨'
  },
  'enigmatic-staff': {
    name: 'Enigmatic Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_ENIGMATICSTAFF.png',
    emoji: '✨'
  },
  'witchwork-staff': {
    name: 'Witchwork Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Witchwork%20Staff.png',
    emoji: '✨'
  },
  'occult-staff': {
    name: 'Occult Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_ARCANESTAFF_HELL.png',
    emoji: '✨'
  },
  'evensong': {
    name: 'Evensong',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Evensong.png',
    emoji: '✨'
  },
  'malevolent-locus': {
    name: 'Malevolent Locus',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Malevolent%20Locus.png',
    emoji: '✨'
  },
  'astral-staff': {
    name: 'Astral Staff',
    category: 'arcane_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Astral%20Staff.png',
    emoji: '✨'
  },

  // CURSE STAFFS
  'great-curse-staff': {
    name: 'Great Curse Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Great%20Cursed%20Staff.png',
    emoji: '💀'
  },
  '1h-curse-staff': {
    name: '1H Curse Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_CURSEDSTAFF.png',
    emoji: '💀'
  },
  'demonic-staff': {
    name: 'Demonic Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_DEMONICSTAFF.png',
    emoji: '💀'
  },
  'cursed-skull': {
    name: 'Cursed Skull',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/T8_2H_SKULLORB_HELL.png',
    emoji: '💀'
  },
  'shadowcaller': {
    name: 'Shadowcaller',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Shadowcaller.png',
    emoji: '💀'
  },
  'lifecurse-staff': {
    name: 'Lifecurse Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Lifecurse%20Staff.png',
    emoji: '💀'
  },
  'damnation-staff': {
    name: 'Damnation Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Damnation%20Staff.png',
    emoji: '💀'
  },
  'rotcaller-staff': {
    name: 'Rotcaller Staff',
    category: 'curse_staff',
    role: 'dps',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Rotcaller%20Staff.png',
    emoji: '💀'
  },

  // HAMMERS (Tank)
  'polehammer': {
    name: 'Polehammer',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/T8_2H_POLEHAMMER.png',
    emoji: '🔨'
  },
  'great-hammer': {
    name: 'Great Hammer',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/T8_2H_HAMMER.png',
    emoji: '🔨'
  },
  'tombhammer': {
    name: 'Tombhammer',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/T8_2H_HAMMER_UNDEAD.png',
    emoji: '🔨'
  },
  'grovekeeper': {
    name: 'Grovekeeper',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Grovekeeper.png',
    emoji: '🔨'
  },
  'hand-of-justice': {
    name: 'Hand of Justice',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/T8_2H_HAMMER_AVALON.png',
    emoji: '🔨'
  },
  'hammer': {
    name: '1H Hammer',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Hammer.png',
    emoji: '🔨'
  },
  'forge-hammers': {
    name: 'Forge Hammers',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Forge%20Hammers.png',
    emoji: '🔨'
  },
  'truebolt-hammer': {
    name: 'Truebolt Hammer',
    category: 'hammer',
    role: 'tank',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Truebolt%20Hammer.png',
    emoji: '🔨'
  },

  // HOLY STAFFS (Healer)
  'great-holy-staff': {
    name: 'Great Holy Staff',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Great%20Holy%20Staff.png',
    emoji: '✝️'
  },
  '1h-holy-staff': {
    name: '1H Holy Staff',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_HOLYSTAFF.png',
    emoji: '✝️'
  },
  'divine-staff': {
    name: 'Divine Staff',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_2H_DIVINESTAFF.png',
    emoji: '✝️'
  },
  'fallen': {
    name: 'Fallen',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_2H_HOLYSTAFF_HELL.png',
    emoji: '✝️'
  },
  'redemption': {
    name: 'Redemption',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Redemption%20Staff.png',
    emoji: '✝️'
  },
  'lifetouch-staff': {
    name: 'Lifetouch Staff',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Lifetouch%20Staff.png',
    emoji: '✝️'
  },
  'hallowfall': {
    name: 'Hallowfall',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Hallowfall.png',
    emoji: '✝️'
  },
  'exalted-staff': {
    name: 'Exalted Staff',
    category: 'holy_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Exalted%20Staff.png',
    emoji: '✝️'
  },

  // NATURE STAFFS (Healer)
  'great-nature-staff': {
    name: 'Great Nature Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Great%20Nature%20Staff.png',
    emoji: '🌿'
  },
  '1h-nature-staff': {
    name: '1H Nature Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_MAIN_NATURESTAFF.png',
    emoji: '🌿'
  },
  'wild-staff': {
    name: 'Wild Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_2H_WILDSTAFF.png',
    emoji: '🌿'
  },
  'rampant-staff': {
    name: 'Rampant Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_2H_NATURESTAFF_KEEPER.png',
    emoji: '🌿'
  },
  'blight-staff': {
    name: 'Blight Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/T8_2H_NATURESTAFF_HELL.png',
    emoji: '🌿'
  },
  'druidic-staff': {
    name: 'Druidic Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Druidic%20Staff.png',
    emoji: '🌿'
  },
  'ironroot-staff': {
    name: 'Ironroot Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Ironroot%20Staff.png',
    emoji: '🌿'
  },
  'forgebark-staff': {
    name: 'Forgebark Staff',
    category: 'nature_staff',
    role: 'healer',
    image: 'https://render.albiononline.com/v1/item/Elder%27s%20Forgebark%20Staff.png',
    emoji: '🌿'
  },
}

// Armor Types
const ALBION_ARMOR = {
  // Helmets
  'soldier-helmet': {
    name: 'Soldier Helmet',
    type: 'plate',
    slot: 'head',
    image: 'https://render.albiononline.com/v1/item/T8_HEAD_PLATE_SET1.png'
  },
  'guardian-helmet': {
    name: 'Guardian Helmet',
    type: 'plate',
    slot: 'head',
    image: 'https://render.albiononline.com/v1/item/T8_HEAD_PLATE_SET2.png'
  },
  'graveguard-helmet': {
    name: 'Graveguard Helmet',
    type: 'plate',
    slot: 'head',
    image: 'https://render.albiononline.com/v1/item/T8_HEAD_PLATE_UNDEAD.png'
  },
  
  // Add more armor as needed
}

// Zone Types
const ALBION_ZONES = {
  'blue-zone': {
    name: 'Blue Zone',
    tier: 'safe',
    pvp: false,
    description: 'Safe zones - No PvP allowed',
    color: '🔵',
    emoji: '🛡️'
  },
  'yellow-zone': {
    name: 'Yellow Zone',
    tier: 'low-risk',
    pvp: 'optional',
    description: 'Low-risk zones - PvP allowed but penalties apply',
    color: '🟡',
    emoji: '⚠️'
  },
  'red-zone': {
    name: 'Red Zone',
    tier: 'high-risk',
    pvp: true,
    description: 'High-risk zones - Full loot PvP',
    color: '🔴',
    emoji: '⚔️'
  },
  'black-zone': {
    name: 'Black Zone',
    tier: 'extreme-risk',
    pvp: true,
    description: 'Extreme-risk zones - Full loot PvP, best rewards',
    color: '⚫',
    emoji: '💀'
  },
  'roads-of-avalon': {
    name: 'Roads of Avalon',
    tier: 'special',
    pvp: true,
    description: 'Special randomized zones with unique rewards',
    color: '🟣',
    emoji: '🌀'
  },
  'mists': {
    name: 'Mists',
    tier: 'solo',
    pvp: true,
    description: 'Solo/small group instanced zones',
    color: '🌫️',
    emoji: '🌫️'
  }
}

// Helper function to get weapon by name (case insensitive)
function getWeapon(weaponName) {
  const key = weaponName.toLowerCase().replace(/\s+/g, '-')
  return ALBION_WEAPONS[key] || null
}

// Helper function to get all weapons by role
function getWeaponsByRole(role) {
  return Object.entries(ALBION_WEAPONS)
    .filter(([_, weapon]) => weapon.role === role)
    .map(([key, weapon]) => ({ key, ...weapon }))
}

// Helper function to get all weapons by category
function getWeaponsByCategory(category) {
  return Object.entries(ALBION_WEAPONS)
    .filter(([_, weapon]) => weapon.category === category)
    .map(([key, weapon]) => ({ key, ...weapon }))
}

// Get weapon choices for Discord slash command
function getWeaponChoices() {
  return Object.entries(ALBION_WEAPONS).map(([key, weapon]) => ({
    name: `${weapon.emoji} ${weapon.name}`,
    value: key
  }))
}

// Get zone choices for Discord slash command
function getZoneChoices() {
  return Object.entries(ALBION_ZONES).map(([key, zone]) => ({
    name: `${zone.emoji} ${zone.name}`,
    value: key
  }))
}

module.exports = {
  WEAPON_TYPES,
  ALBION_WEAPONS,
  ALBION_ARMOR,
  ALBION_ZONES,
  getWeapon,
  getWeaponsByRole,
  getWeaponsByCategory,
  getWeaponChoices,
  getZoneChoices
}
