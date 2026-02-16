/**
 * Weapon Templates Storage
 * Stores custom weapon-based templates created by Content Leads
 */

const fs = require('fs')
const path = require('path')

// File path for persistent storage
const TEMPLATES_FILE = path.join(__dirname, 'weapon_templates.json')

// In-memory storage for weapon templates
// Format: { templateName: { weapons: { weaponKey: slots }, description: '' } }
const WEAPON_TEMPLATES = new Map()

/**
 * Load templates from file on startup
 */
function loadTemplatesFromFile() {
  try {
    if (fs.existsSync(TEMPLATES_FILE)) {
      const data = fs.readFileSync(TEMPLATES_FILE, 'utf8')
      const templates = JSON.parse(data)
      
      // Load into Map
      for (const [name, templateData] of Object.entries(templates)) {
        WEAPON_TEMPLATES.set(name, templateData)
      }
      
      console.log(`✅ Loaded ${WEAPON_TEMPLATES.size} weapon templates from file`)
    } else {
      console.log('📝 No existing weapon templates file found. Starting fresh.')
    }
  } catch (err) {
    console.error('❌ Error loading weapon templates:', err)
  }
}

/**
 * Save all templates to file
 */
function saveTemplatesToFile() {
  try {
    const templates = Object.fromEntries(WEAPON_TEMPLATES)
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(templates, null, 2), 'utf8')
    console.log(`💾 Saved ${WEAPON_TEMPLATES.size} weapon templates to file`)
  } catch (err) {
    console.error('❌ Error saving weapon templates:', err)
  }
}

// Load templates when module is imported
loadTemplatesFromFile()

// Weapon aliases/nicknames for easier signup
const WEAPON_ALIASES = {
  // Holy Staff aliases
  'hallow': 'hallowfall',
  'hallowf': 'hallowfall',
  'redeem': 'redemption',
  'fallen': 'fallen',
  'divine': 'divine-staff',
  'lifetouch': 'lifetouch-staff',
  'exalted': 'exalted-staff',
  
  // Nature Staff aliases
  'blight': 'blight-staff',
  'druid': 'druidic-staff',
  'druidic': 'druidic-staff',
  'wild': 'wild-staff',
  'rampant': 'rampant-staff',
  'ironroot': 'ironroot-staff',
  'forgebark': 'forgebark-staff',
  
  // Fire Staff aliases
  'blaze': 'blazing-staff',
  'blazing': 'blazing-staff',
  'infernal': 'infernal-staff',
  'brimstone': 'brimstone-staff',
  'dawn': 'dawnsong',
  'dawnsong': 'dawnsong',
  
  // Frost Staff aliases
  'glacial': 'glacial-staff',
  'glacier': 'glacial-staff',
  'hoar': 'hoarfrost-staff',
  'hoarfrost': 'hoarfrost-staff',
  'icicle': 'icicle-staff',
  'perma': 'permafrost-prism',
  'permafrost': 'permafrost-prism',
  'arctic': 'arctic-staff',
  'chill': 'chillhowl',
  'chillhowl': 'chillhowl',
  
  // Arcane Staff aliases
  'enigma': 'enigmatic-staff',
  'enigmatic': 'enigmatic-staff',
  'witch': 'witchwork-staff',
  'witchwork': 'witchwork-staff',
  'occult': 'occult-staff',
  'evensong': 'evensong',
  'malevolent': 'malevolent-locus',
  'astral': 'astral-staff',
  
  // Curse Staff aliases
  'demo': 'demonic-staff',
  'demonic': 'demonic-staff',
  'skull': 'cursed-skull',
  'shadow': 'shadowcaller',
  'shadowcaller': 'shadowcaller',
  'lifecurse': 'lifecurse-staff',
  'damnation': 'damnation-staff',
  'rotcaller': 'rotcaller-staff',
  
  // Hammer aliases (Tank)
  'pole': 'polehammer',
  'polehammer': 'polehammer',
  'greathammer': 'great-hammer',
  'tomb': 'tombhammer',
  'tombhammer': 'tombhammer',
  'grove': 'grovekeeper',
  'grovekeeper': 'grovekeeper',
  'justice': 'hand-of-justice',
  'forge': 'forge-hammers',
  'truebolt': 'truebolt-hammer',
  
  // Crossbow aliases
  'bolt': 'boltcasters',
  'boltcasters': 'boltcasters',
  'boltcaster': 'boltcasters',
  'weep': 'weeping-repeater',
  'weeping': 'weeping-repeater',
  'repeater': 'weeping-repeater',
  'siege': 'siegebow',
  'siegebow': 'siegebow',
  'energy': 'energy-shaper',
  'shaper': 'energy-shaper',
  'heavy': 'heavy-crossbow',
  'light': 'light-crossbow',
  
  // Bow aliases
  'long': 'longbow',
  'longbow': 'longbow',
  'war': 'warbow',
  'warbow': 'warbow',
  'badon': 'bow-of-badon',
  'mist': 'mistpiercer',
  'mistpiercer': 'mistpiercer',
  'wail': 'wailing-bow',
  'wailing': 'wailing-bow',
  'whisper': 'whispering-bow',
  'whispering': 'whispering-bow',
  
  // Dagger aliases
  'blood': 'bloodletter',
  'bloodletter': 'bloodletter',
  'claw': 'claws',
  'claws': 'claws',
  'death': 'deathgivers',
  'deathgivers': 'deathgivers',
  'demon': 'demonfang',
  'demonfang': 'demonfang',
  'bridled': 'bridled-fury',
  
  // Sword aliases
  'broad': 'broadsword',
  'broadsword': 'broadsword',
  'clay': 'claymore',
  'claymore': 'claymore',
  'dual': 'dual-swords',
  'clarent': 'clarent-blade',
  'carving': 'carving-sword',
  'gala': 'galatine-pair',
  'galatine': 'galatine-pair',
  
  // Axe aliases
  'battle': 'battleaxe',
  'battleaxe': 'battleaxe',
  'great': 'greataxe',
  'greataxe': 'greataxe',
  'hal': 'halberd',
  'halberd': 'halberd',
  'scythe': 'infernal-scythe',
  'infernal-scythe': 'infernal-scythe',
  'carrion': 'carrioncaller',
  'carrioncaller': 'carrioncaller',
  'bear': 'bearpaws',
  'bearpaws': 'bearpaws',
  'realm': 'realmbreaker',
  'realmbreaker': 'realmbreaker',
  'crystal': 'crystal-reaper',
  'reaper': 'crystal-reaper',
  
  // Mace aliases
  'heavymace': 'heavy-mace',
  'bedrock': 'bedrock-mace',
  'incubus': 'incubus-mace',
  'dreadstorm': 'dreadstorm-monarch',
  'monarch': 'dreadstorm-monarch',
  
  // Spear aliases
  'pike': 'pike',
  'glaive': 'glaive',
  'trinity': 'trinity-spear',
  'spirit': 'spirithunter',
  'spirithunter': 'spirithunter',
  'heron': 'heron-spear',
  'rift': 'rift-glaive',
  'day': 'daybreaker',
  'daybreaker': 'daybreaker',
  
  // Quarterstaff aliases
  'iron': 'iron-clad-staff',
  'ironclad': 'iron-clad-staff',
  'double': 'double-bladed-staff',
  'monk': 'black-monk-stave',
  'soul': 'soulscythe',
  'soulscythe': 'soulscythe',
  'balance': 'staff-of-balance',
  'grail': 'grailseeker',
  'grailseeker': 'grailseeker'
}

/**
 * Save a weapon template
 */
function saveTemplate(templateName, weaponSlots, description = '') {
  WEAPON_TEMPLATES.set(templateName.toLowerCase(), {
    weapons: weaponSlots,
    description: description
  })
  saveTemplatesToFile() // Persist to file
  return true
}

/**
 * Get a weapon template
 */
function getTemplate(templateName) {
  return WEAPON_TEMPLATES.get(templateName.toLowerCase()) || null
}

/**
 * Delete a weapon template
 */
function deleteTemplate(templateName) {
  const result = WEAPON_TEMPLATES.delete(templateName.toLowerCase())
  if (result) {
    saveTemplatesToFile() // Persist to file
  }
  return result
}

/**
 * List all weapon templates
 */
function listTemplates() {
  return Array.from(WEAPON_TEMPLATES.entries()).map(([name, data]) => ({
    name,
    ...data
  }))
}

/**
 * Resolve weapon alias to full weapon key
 */
function resolveWeaponAlias(input) {
  const normalized = input.toLowerCase().replace(/\s+/g, '-')
  
  // Check if it's an alias
  if (WEAPON_ALIASES[normalized]) {
    return WEAPON_ALIASES[normalized]
  }
  
  // Check if it's already a valid weapon key
  return normalized
}

module.exports = {
  saveTemplate,
  getTemplate,
  deleteTemplate,
  listTemplates,
  resolveWeaponAlias,
  WEAPON_ALIASES
}
