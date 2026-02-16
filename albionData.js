/**
 * Albion Online Weapons Database
 * Simplified structure: name, category, emoji only
 * Role/usage is defined by template creators via custom names
 */

const ALBION_WEAPONS = {
  // SWORDS
  'broadsword': { name: 'Broadsword', category: 'sword', emoji: '⚔️' },
  'claymore': { name: 'Claymore', category: 'sword', emoji: '⚔️' },
  'dual-swords': { name: 'Dual Swords', category: 'sword', emoji: '⚔️' },
  'clarent-blade': { name: 'Clarent Blade', category: 'sword', emoji: '⚔️' },
  'carving-sword': { name: 'Carving Sword', category: 'sword', emoji: '⚔️' },
  'galatine-pair': { name: 'Galatine Pair', category: 'sword', emoji: '⚔️' },

  // AXES
  'battleaxe': { name: 'Battleaxe', category: 'axe', emoji: '🪓' },
  'greataxe': { name: 'Greataxe', category: 'axe', emoji: '🪓' },
  'halberd': { name: 'Halberd', category: 'axe', emoji: '🪓' },
  'infernal-scythe': { name: 'Infernal Scythe', category: 'axe', emoji: '🪓' },
  'carrioncaller': { name: 'Carrioncaller', category: 'axe', emoji: '🪓' },
  'realmbreaker': { name: 'Realmbreaker', category: 'axe', emoji: '🪓' },
  'crystal-reaper': { name: 'Crystal Reaper', category: 'axe', emoji: '🪓' },

  // MACES
  'mace': { name: 'Mace', category: 'mace', emoji: '🔨' },
  'heavy-mace': { name: 'Heavy Mace', category: 'mace', emoji: '🔨' },
  'bedrock-mace': { name: 'Bedrock Mace', category: 'mace', emoji: '🔨' },
  'incubus-mace': { name: 'Incubus Mace', category: 'mace', emoji: '🔨' },
  'dreadstorm-monarch': { name: 'Dreadstorm Monarch', category: 'mace', emoji: '🔨' },
  
  // HAMMERS
  'hammer': { name: 'Hammer', category: 'hammer', emoji: '🔨' },
  'polehammer': { name: 'Polehammer', category: 'hammer', emoji: '🔨' },
  'great-hammer': { name: 'Great Hammer', category: 'hammer', emoji: '🔨' },
  'tombhammer': { name: 'Tombhammer', category: 'hammer', emoji: '🔨' },
  'grovekeeper': { name: 'Grovekeeper', category: 'hammer', emoji: '🔨' },
  'hand-of-justice': { name: 'Hand of Justice', category: 'hammer', emoji: '🔨' },
  'forge-hammers': { name: 'Forge Hammers', category: 'hammer', emoji: '🔨' },
  'truebolt-hammer': { name: 'Truebolt Hammer', category: 'hammer', emoji: '🔨' },

  // DAGGERS
  'dagger': { name: 'Dagger', category: 'dagger', emoji: '🗡️' },
  'dagger-pair': { name: 'Dagger Pair', category: 'dagger', emoji: '🗡️' },
  'claws': { name: 'Claws', category: 'dagger', emoji: '🗡️' },
  'bloodletter': { name: 'Bloodletter', category: 'dagger', emoji: '🗡️' },
  'deathgivers': { name: 'Deathgivers', category: 'dagger', emoji: '🗡️' },
  'demonfang': { name: 'Demonfang', category: 'dagger', emoji: '🗡️' },
  'bridled-fury': { name: 'Bridled Fury', category: 'dagger', emoji: '🗡️' },

  // SPEARS
  'spear': { name: 'Spear', category: 'spear', emoji: '🔱' },
  'pike': { name: 'Pike', category: 'spear', emoji: '🔱' },
  'glaive': { name: 'Glaive', category: 'spear', emoji: '🔱' },
  'trinity-spear': { name: 'Trinity Spear', category: 'spear', emoji: '🔱' },
  'spirithunter': { name: 'Spirithunter', category: 'spear', emoji: '🔱' },
  'heron-spear': { name: 'Heron Spear', category: 'spear', emoji: '🔱' },
  'rift-glaive': { name: 'Rift Glaive', category: 'spear', emoji: '🔱' },
  'daybreaker': { name: 'Daybreaker', category: 'spear', emoji: '🔱' },

  // QUARTERSTAFFS
  'quarterstaff': { name: 'Quarterstaff', category: 'quarterstaff', emoji: '☯️' },
  'iron-clad-staff': { name: 'Iron-clad Staff', category: 'quarterstaff', emoji: '☯️' },
  'double-bladed-staff': { name: 'Double Bladed Staff', category: 'quarterstaff', emoji: '☯️' },
  'black-monk-stave': { name: 'Black Monk Stave', category: 'quarterstaff', emoji: '☯️' },
  'soulscythe': { name: 'Soulscythe', category: 'quarterstaff', emoji: '☯️' },
  'staff-of-balance': { name: 'Staff of Balance', category: 'quarterstaff', emoji: '☯️' },
  'grailseeker': { name: 'Grailseeker', category: 'quarterstaff', emoji: '☯️' },

  // BOWS
  'bow': { name: 'Bow', category: 'bow', emoji: '🏹' },
  'longbow': { name: 'Longbow', category: 'bow', emoji: '🏹' },
  'warbow': { name: 'Warbow', category: 'bow', emoji: '🏹' },
  'bow-of-badon': { name: 'Bow of Badon', category: 'bow', emoji: '🏹' },
  'mistpiercer': { name: 'Mistpiercer', category: 'bow', emoji: '🏹' },
  'wailing-bow': { name: 'Wailing Bow', category: 'bow', emoji: '🏹' },
  'whispering-bow': { name: 'Whispering Bow', category: 'bow', emoji: '🏹' },

  // CROSSBOWS
  'crossbow': { name: 'Crossbow', category: 'crossbow', emoji: '🎯' },
  'light-crossbow': { name: 'Light Crossbow', category: 'crossbow', emoji: '🎯' },
  'heavy-crossbow': { name: 'Heavy Crossbow', category: 'crossbow', emoji: '🎯' },
  'weeping-repeater': { name: 'Weeping Repeater', category: 'crossbow', emoji: '🎯' },
  'boltcasters': { name: 'Boltcasters', category: 'crossbow', emoji: '🎯' },
  'siegebow': { name: 'Siegebow', category: 'crossbow', emoji: '🎯' },
  'energy-shaper': { name: 'Energy Shaper', category: 'crossbow', emoji: '🎯' },

  // FIRE STAFFS
  'fire-staff': { name: 'Fire Staff', category: 'fire_staff', emoji: '🔥' },
  'great-fire-staff': { name: 'Great Fire Staff', category: 'fire_staff', emoji: '🔥' },
  'infernal-staff': { name: 'Infernal Staff', category: 'fire_staff', emoji: '🔥' },
  'blazing-staff': { name: 'Blazing Staff', category: 'fire_staff', emoji: '🔥' },
  'brimstone-staff': { name: 'Brimstone Staff', category: 'fire_staff', emoji: '🔥' },
  'dawnsong': { name: 'Dawnsong', category: 'fire_staff', emoji: '🔥' },
  'lightcaller': { name: 'Lightcaller', category: 'fire_staff', emoji: '🔥' },

  // FROST STAFFS
  'frost-staff': { name: 'Frost Staff', category: 'frost_staff', emoji: '❄️' },
  'hoarfrost-staff': { name: 'Hoarfrost Staff', category: 'frost_staff', emoji: '❄️' },
  'glacial-staff': { name: 'Glacial Staff', category: 'frost_staff', emoji: '❄️' },
  'icicle-staff': { name: 'Icicle Staff', category: 'frost_staff', emoji: '❄️' },
  'permafrost-prism': { name: 'Permafrost Prism', category: 'frost_staff', emoji: '❄️' },
  'arctic-staff': { name: 'Arctic Staff', category: 'frost_staff', emoji: '❄️' },
  'chillhowl': { name: 'Chillhowl', category: 'frost_staff', emoji: '❄️' },

  // ARCANE STAFFS
  'arcane-staff': { name: 'Arcane Staff', category: 'arcane_staff', emoji: '✨' },
  'great-arcane-staff': { name: 'Great Arcane Staff', category: 'arcane_staff', emoji: '✨' },
  'enigmatic-staff': { name: 'Enigmatic Staff', category: 'arcane_staff', emoji: '✨' },
  'witchwork-staff': { name: 'Witchwork Staff', category: 'arcane_staff', emoji: '✨' },
  'occult-staff': { name: 'Occult Staff', category: 'arcane_staff', emoji: '✨' },
  'evensong': { name: 'Evensong', category: 'arcane_staff', emoji: '✨' },
  'malevolent-locus': { name: 'Malevolent Locus', category: 'arcane_staff', emoji: '✨' },
  'astral-staff': { name: 'Astral Staff', category: 'arcane_staff', emoji: '✨' },

  // CURSE STAFFS
  'cursed-staff': { name: 'Cursed Staff', category: 'curse_staff', emoji: '💀' },
  'great-cursed-staff': { name: 'Great Cursed Staff', category: 'curse_staff', emoji: '💀' },
  'demonic-staff': { name: 'Demonic Staff', category: 'curse_staff', emoji: '💀' },
  'cursed-skull': { name: 'Cursed Skull', category: 'curse_staff', emoji: '💀' },
  'shadowcaller': { name: 'Shadowcaller', category: 'curse_staff', emoji: '💀' },
  'lifecurse-staff': { name: 'Lifecurse Staff', category: 'curse_staff', emoji: '💀' },
  'damnation-staff': { name: 'Damnation Staff', category: 'curse_staff', emoji: '💀' },
  'rotcaller-staff': { name: 'Rotcaller Staff', category: 'curse_staff', emoji: '💀' },

  // HOLY STAFFS
  'holy-staff': { name: 'Holy Staff', category: 'holy_staff', emoji: '✝️' },
  'great-holy-staff': { name: 'Great Holy Staff', category: 'holy_staff', emoji: '✝️' },
  'divine-staff': { name: 'Divine Staff', category: 'holy_staff', emoji: '✝️' },
  'lifetouch-staff': { name: 'Lifetouch Staff', category: 'holy_staff', emoji: '✝️' },
  'hallowfall': { name: 'Hallowfall', category: 'holy_staff', emoji: '✝️' },
  'redemption': { name: 'Redemption', category: 'holy_staff', emoji: '✝️' },
  'exalted-staff': { name: 'Exalted Staff', category: 'holy_staff', emoji: '✝️' },
  'fallen': { name: 'Fallen', category: 'holy_staff', emoji: '✝️' },

  // NATURE STAFFS
  'nature-staff': { name: 'Nature Staff', category: 'nature_staff', emoji: '🌿' },
  'great-nature-staff': { name: 'Great Nature Staff', category: 'nature_staff', emoji: '🌿' },
  'wild-staff': { name: 'Wild Staff', category: 'nature_staff', emoji: '🌿' },
  'rampant-staff': { name: 'Rampant Staff', category: 'nature_staff', emoji: '🌿' },
  'blight-staff': { name: 'Blight Staff', category: 'nature_staff', emoji: '🌿' },
  'druidic-staff': { name: 'Druidic Staff', category: 'nature_staff', emoji: '🌿' },
  'ironroot-staff': { name: 'Ironroot Staff', category: 'nature_staff', emoji: '🌿' },
  'forgebark-staff': { name: 'Forgebark Staff', category: 'nature_staff', emoji: '🌿' },

  // SHAPESHIFTER STAFFS (Based on your image)
  'prowling-staff': { name: 'Prowling Staff', category: 'shapeshifter_staff', emoji: '🐺' },
  'rootbound-staff': { name: 'Rootbound Staff', category: 'shapeshifter_staff', emoji: '🌳' },
  'primal-staff': { name: 'Primal Staff', category: 'shapeshifter_staff', emoji: '🦁' },
  'bloodmoon-staff': { name: 'Bloodmoon Staff', category: 'shapeshifter_staff', emoji: '🌙' },
  'hellspawn-staff': { name: 'Hellspawn Staff', category: 'shapeshifter_staff', emoji: '👹' },
  'earthrune-staff': { name: 'Earthrune Staff', category: 'shapeshifter_staff', emoji: '🪨' },
  'lightcaller': { name: 'Lightcaller', category: 'shapeshifter_staff', emoji: '✨' },
}

// Zone Types
const ALBION_ZONES = {
  BLUE: {
    name: 'Blue Zone',
    color: 0x3498db,
    emoji: '🔵',
    description: 'Safe zone - no full loot PvP'
  },
  YELLOW: {
    name: 'Yellow Zone',
    color: 0xf1c40f,
    emoji: '🟡',
    description: 'Partial loot PvP zone'
  },
  RED: {
    name: 'Red Zone',
    color: 0xe74c3c,
    emoji: '🔴',
    description: 'Full loot PvP zone'
  },
  BLACK: {
    name: 'Black Zone',
    color: 0x2c3e50,
    emoji: '⚫',
    description: 'Full loot PvP zone with territory control'
  },
  ROADS: {
    name: 'Roads of Avalon',
    color: 0x9b59b6,
    emoji: '🛣️',
    description: 'Randomized dungeon network'
  },
  MISTS: {
    name: 'Mists',
    color: 0x95a5a6,
    emoji: '🌫️',
    description: 'Solo/small group PvP zone'
  }
}

/**
 * Get a weapon by key
 */
function getWeapon(weaponKey) {
  return ALBION_WEAPONS[weaponKey] || null
}

/**
 * Get autocomplete choices for weapons
 */
function getWeaponChoices() {
  return Object.entries(ALBION_WEAPONS).map(([key, weapon]) => ({
    name: `${weapon.emoji} ${weapon.name}`,
    value: key
  }))
}

/**
 * Get autocomplete choices for zones
 */
function getZoneChoices() {
  return Object.entries(ALBION_ZONES).map(([key, zone]) => ({
    name: `${zone.emoji} ${zone.name}`,
    value: key
  }))
}

module.exports = {
  ALBION_WEAPONS,
  ALBION_ZONES,
  getWeapon,
  getWeaponChoices,
  getZoneChoices
}
