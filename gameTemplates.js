/**
 * Game-Specific Content Templates
 * Based on actual in-game content requirements
 */

const GAME_TEMPLATES = {
  // Pure Tracking in MLP
  'pure-tracking-mlp': {
    name: 'Pure Tracking in MLP',
    type: 'tracking',
    roles: {
      dreadstorm: 1,
      hallowfall: 1,
      cursed_staff: 1,
      dagger_bolt: 2, // Dagger or Boltcaster
      dagger_reaper: 2 // Dagger or Reaper
    },
    gearRequirements: {
      all: [
        'Gears provided by the guild',
        'Silver bags will be taken by the guild',
        'No specs needed, just balls and comprehension',
        'Party fills as soon as possible'
      ]
    }
  },

  // Faction Capping PvP
  'faction-capping': {
    name: 'Faction Capping (PVP READY)',
    type: 'pvp',
    roles: {
      caller: 1,
      heavymace: 1,
      hallowfall: 1,
      truebolt_oath_root: 1, // Truebolt/Oathkeeper/Rootbound
      redemption_blight: 1,
      realmbreaker: 1,
      carving_rotcaller: 1,
      demonfang_battlebracer: 2,
      longbow: 1
    },
    gearRequirements: {
      all: [
        'T7 equivalent at least 80 specs needed',
        'PVE prio but we fight if necessary',
        'Mass at bridgewatch'
      ]
    }
  },

  // 5 Man Tracking
  '5man-tracking': {
    name: '5 Man Tracking',
    type: 'tracking',
    roles: {
      healer: 1,
      dps: 3,
      tank: 1
    },
    gearRequirements: {
      all: [
        'Light gear for mobility',
        'Bring consumables',
        'Follow caller instructions'
      ]
    }
  }
}

// Role display names for game-specific roles
const GAME_ROLE_DISPLAY = {
  dreadstorm: 'Dreadstorm',
  hallowfall: 'Hallowfall',
  cursed_staff: 'Cursed Staff',
  dagger_bolt: 'Dagger or Boltcaster',
  dagger_reaper: 'Dagger or Reaper',
  heavymace: 'Heavymace',
  truebolt_oath_root: 'Truebolt/Oathkeeper/Rootbound',
  redemption_blight: 'Redemption/Blight',
  realmbreaker: 'Realmbreaker',
  carving_rotcaller: 'Carving/Rotcaller',
  demonfang_battlebracer: 'Demonfang/Battlebracer',
  longbow: 'Longbow'
}

// Role icons for game-specific roles
const GAME_ROLE_ICONS = {
  dreadstorm: '⚡',
  hallowfall: '🌟',
  cursed_staff: '💀',
  dagger_bolt: '🗡️',
  dagger_reaper: '⚔️',
  heavymace: '🔨',
  truebolt_oath_root: '🛡️',
  redemption_blight: '✨',
  realmbreaker: '⚒️',
  carving_rotcaller: '🪓',
  demonfang_battlebracer: '👊',
  longbow: '🏹'
}

// Gear requirement images/descriptions per content type
const GEAR_IMAGES = {
    'pure-tracking-mlp': {
    imageUrl: null,
    description: '**Provided by Guild:**\n' +
      '• All gear\n' +
      '• Silver bags go to guild\n' +
      '\n**Requirements:**\n' +
      '• No special specs needed\n' +
      '• Bring focus and awareness\n' +
      '• Fill party ASAP'
  },
  'faction-capping': {
    imageUrl: null,
    description: '**Requirements:**\n' +
      '• T7 equivalent gear minimum\n' +
      '• 80+ specs required\n' +
      '• PVE priority, fight if needed\n' +
      '• Mass at Bridgewatch'
  },
  '5man-tracking': {
    imageUrl: null,
    description: '**Requirements:**\n' +
      '• Light/Mobile gear\n' +
      '• Consumables (potions, food)\n' +
      '• Listen to caller'
  }
}

module.exports = {
  GAME_TEMPLATES,
  GAME_ROLE_DISPLAY,
  GAME_ROLE_ICONS,
  GEAR_IMAGES
}
