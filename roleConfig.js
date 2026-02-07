/**
 * Role Configuration & Icon System
 * This file manages role templates, icons, and weapon-specific customizations
 */

// Predefined content templates
const TEMPLATES = {
  'small-dungeon': { tank: 1, healer: 1, dps: 3, caller: 1 },
  'large-dungeon': { tank: 2, healer: 2, dps: 6, caller: 1 },
  'pvp-small': { tank: 1, healer: 1, dps: 3, support: 2, caller: 1 },
  'pvp-large': { tank: 2, healer: 2, dps: 5, support: 3, catcher: 2, caller: 1 },
  'raid': { tank: 3, healer: 3, dps: 10, support: 4, caller: 1 },
  
  // Game-specific templates (will be merged with GAME_TEMPLATES)
  'cathedral-rat': null,
  'pure-tracking-mlp': null,
  'faction-capping': null,
  '5man-tracking': null
}

// Base role icons
const ROLE_ICONS = {
  tank: '🛡️',
  healer: '💖',
  dps: '⚔️',
  support: '✨',
  catcher: '🎯',
  caller: '📣',
  bench: '🪑',
  absence: '🚫'
}

// Weapon/specialization icons for future expansion
// Format: 'role:weapon' => icon
const WEAPON_ICONS = {
  // DPS weapons
  'dps:crystal-reaper': '💎⚔️',
  'dps:longbow': '🏹',
  'dps:crossbow': '🎯',
  'dps:dagger': '🗡️',
  'dps:sword': '⚔️',
  'dps:greatsword': '🗿⚔️',
  
  // Tank weapons
  'tank:shield': '🛡️',
  'tank:hammer': '🔨',
  
  // Healer weapons
  'healer:staff': '🔮',
  'healer:wand': '✨',
  
  // Support weapons
  'support:banner': '🚩',
  'support:horn': '📯',
  
  // Catcher weapons
  'catcher:net': '🕸️',
  'catcher:trap': '🪤'
}

// Role display names
const ROLE_DISPLAY_NAMES = {
  tank: 'Tank',
  healer: 'Healer',
  dps: 'DPS',
  support: 'Support',
  catcher: 'Catcher',
  caller: 'Caller',
  bench: 'Bench',
  absence: 'Absence'
}

/**
 * Get icon for a role with optional weapon specialization
 * @param {string} role - The role name
 * @param {string} weapon - Optional weapon/spec name
 * @returns {string} The icon for the role/weapon combo
 */
function getRoleIcon(role, weapon = null) {
  if (weapon) {
    const key = `${role}:${weapon}`
    return WEAPON_ICONS[key] || ROLE_ICONS[role] || '❓'
  }
  return ROLE_ICONS[role] || '❓'
}

/**
 * Get display name for a role
 * @param {string} role - The role name
 * @returns {string} The display name
 */
function getRoleDisplayName(role) {
  return ROLE_DISPLAY_NAMES[role] || role
}

/**
 * Add a custom weapon icon
 * @param {string} role - The role name
 * @param {string} weapon - The weapon name
 * @param {string} icon - The icon to use
 */
function addWeaponIcon(role, weapon, icon) {
  WEAPON_ICONS[`${role}:${weapon}`] = icon
}

module.exports = {
  TEMPLATES,
  ROLE_ICONS,
  WEAPON_ICONS,
  ROLE_DISPLAY_NAMES,
  getRoleIcon,
  getRoleDisplayName,
  addWeaponIcon
}
