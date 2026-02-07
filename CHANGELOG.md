# Update Summary - February 8, 2026

## 🐛 Bug Fixes

### 1. **Fixed Duplicate Bench/Absence Fields**
**Issue:** When creating content with custom slots, bench and absence were showing twice in the embed.

**Fix:** Modified embed generation to include bench/absence in the main role loop instead of adding them separately.

**Files Changed:**
- [index.js](index.js) - Lines 287-297, 534-558

---

### 2. **Fixed Grace Period Overlap Between Multiple Contents**
**Issue:** When multiple contents were active, the grace period message would post to the newest content's thread instead of the correct one.

**Root Cause:** setTimeout callbacks were using stale channel references instead of looking up fresh data.

**Fix:** 
- Changed `markLateAtMass` and `markAbsentAfterGrace` to accept `channelId` and `guildId` instead of channel object
- Functions now retrieve fresh data from store and guild cache every time they execute
- Each timeout is properly scoped to its specific content

**Files Changed:**
- [index.js](index.js) - Lines 284-286, 595-663

**Technical Details:**
```javascript
// Before (problematic):
setTimeout(() => markLateAtMass(interaction.channel, contentData), ...)

// After (fixed):
setTimeout(() => markLateAtMass(channelId, guildId), ...)
```

---

## ✨ New Features

### 3. **Game-Specific Templates System**

Added 4 new content templates based on actual game content:

#### 🎯 Cathedral Of Rat
- **Roles:** 1 DPS, 1 Caller
- **Type:** Dungeon farming
- **Gear:** Boss swaps, potions, rat set, holy staff required
- **Rules:** No regear on death with wrong build, 30min prep time

#### 🎯 Pure Tracking in MLP
- **Roles:** Dreadstorm, Hallowfall, Cursed Staff, Dagger/Bolt (×2), Dagger/Reaper (×2)
- **Type:** PvE tracking
- **Gear:** Guild-provided, silver bags go to guild
- **Special:** No specs needed, just awareness

#### 🎯 Faction Capping (PVP)
- **Roles:** Caller, Heavymace, Hallowfall, Truebolt/Oath/Root, Redemption/Blight, Realmbreaker, Carving/Rotcaller, Demonfang/Battlebracer (×2), Longbow
- **Type:** Large-scale PvP
- **Gear:** T7 equivalent, 80+ specs minimum
- **Rules:** PvE prio but fight if necessary, mass at Bridgewatch

#### 🎯 5 Man Tracking
- **Roles:** 1 Healer, 3 DPS, 1 Catcher
- **Type:** Small tracking team
- **Gear:** Light/mobile gear, consumables

**Files Created:**
- [gameTemplates.js](gameTemplates.js) - Central template definitions
- [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) - How to add custom templates

**Files Modified:**
- [index.js](index.js) - Template integration
- [roleConfig.js](roleConfig.js) - Template registry
- [FEATURES.md](FEATURES.md) - User documentation

---

### 4. **Automatic Gear Requirement DMs**

When users sign up for game-specific templates, they automatically receive a DM containing:
- Template name and their assigned role
- Detailed gear requirements
- Content-specific rules
- Preparation guidelines
- Optional image (configurable)

**Example DM:**
```
📋 Gear Requirements: Cathedral Of Rat

Your Role: DPS

Required Items:
• Boss Swap Items
• Potions (Healing, Energy)
• Complete Rat Set
• Holy Staff (for revive)

Rules:
• No regear if you die with wrong build
• Mention alt accounts in signup
• Experienced farmers get priority
• Prepare 30min before mass
```

**Implementation:**
- New function: `sendGearRequirementsDM(user, templateKey, role)`
- Silently fails if user has DMs disabled (console log only)
- Sent immediately after successful signup

**Files Changed:**
- [index.js](index.js) - Lines 498-500, 620-645

---

### 5. **Weapon-Specific Role System**

Added 12 new game-specific roles with unique icons and aliases:

| Role | Icon | Aliases | Purpose |
|------|------|---------|---------|
| Dreadstorm | ⚡ | dreadstorm | Tracking |
| Hallowfall | 🌟 | hallowfall | Multi-use |
| Cursed Staff | 💀 | cursed, staff | Tracking |
| Dagger/Bolt | 🗡️ | daggerbolt, bolt, boltcaster | Flex DPS |
| Dagger/Reaper | ⚔️ | daggerreaper, reaper | Flex DPS |
| Heavymace | 🔨 | heavymace, mace | PvP Tank |
| Truebolt/Oath/Root | 🛡️ | truebolt, oath, root | Tank Flex |
| Redemption/Blight | ✨ | redemption, blight | Support |
| Realmbreaker | ⚒️ | realmbreaker, realm | Frontline |
| Carving/Rotcaller | 🪓 | carving, rotcaller | Damage |
| Demonfang/Battlebracer | 👊 | demonfang, bracer | Melee |
| Longbow | 🏹 | longbow, bow | Ranged |

**Features:**
- Multiple aliases per role for easier signup
- Visual distinction with unique emoji
- Validation ensures users can only sign up for roles that exist in the template
- Dynamic embed updates based on template

**Files Changed:**
- [gameTemplates.js](gameTemplates.js) - Role definitions
- [index.js](index.js) - Lines 383-430 (aliases), 445-448 (validation)

---

### 6. **Enhanced Role Validation**

Added checks to prevent users from signing up for roles that don't exist in the current content:

```javascript
// Check if role exists in this content's roles
if (!data.roles.hasOwnProperty(role) && role !== 'out') {
  await message.reply(`❌ **${role}** is not available for this content.`)
  return
}
```

**Benefits:**
- Prevents confusion when using generic role names on specific templates
- Clear error messages
- Maintains data integrity

**Files Changed:**
- [index.js](index.js) - Lines 445-448

---

### 7. **Dynamic Embed System**

Updated embed generation to support:
- Game-specific template icons and names
- Flexible role display based on template
- Automatic role counting and cap tracking
- Smart role ordering

**Features:**
```javascript
// Auto-detects game template and uses appropriate icons
const icon = data.isGameTemplate && GAME_ROLE_ICONS[role] 
  ? GAME_ROLE_ICONS[role] 
  : (ROLE_ICONS[role] || '❓')
```

**Files Changed:**
- [index.js](index.js) - Lines 293-310, 534-558

---

## 📝 Documentation

### New Files Created:

1. **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** (422 lines)
   - Complete guide for adding custom templates
   - Step-by-step examples
   - Troubleshooting section
   - Image hosting recommendations

2. **[gameTemplates.js](gameTemplates.js)** (164 lines)
   - Game-specific template definitions
   - Role icons and display names
   - Gear requirement system
   - Extensible structure

### Updated Files:

3. **[FEATURES.md](FEATURES.md)**
   - Added game-specific templates section
   - New role table with weapon-specific roles
   - Gear requirement DM documentation
   - Customization guide

---

## 🔧 Technical Improvements

### Code Organization
- Separated game templates into dedicated file ([gameTemplates.js](gameTemplates.js))
- Cleaner [index.js](index.js) with better separation of concerns
- Centralized role configuration in [roleConfig.js](roleConfig.js)

### Robustness
- Better error handling in DM sending (silent fail)
- Null-safe array access in updateEmbed
- Proper data freshness in timeout callbacks
- Role existence validation

### Maintainability
- Clear module exports and imports
- Comprehensive inline comments
- Extensible template system
- Easy to add new templates without touching core logic

---

## 📊 Files Changed Summary

| File | Lines Changed | Purpose |
|------|---------------|---------|
| [index.js](index.js) | ~150 | Core functionality, bug fixes, template integration |
| [gameTemplates.js](gameTemplates.js) | 164 (new) | Game-specific templates and gear |
| [roleConfig.js](roleConfig.js) | +4 | Template registry |
| [store.js](store.js) | +6 | Export values() method |
| [FEATURES.md](FEATURES.md) | +60 | User documentation |
| [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) | 422 (new) | Developer guide |
| **TOTAL** | **~806 lines** | |

---

## 🚀 How to Test

1. **Start the bot:**
   ```bash
   node index.js
   ```

2. **Test game-specific template:**
   ```
   /content start
     title: Test Capping
     mass_time: 18:00
     voice_channel: #your-vc
     template: faction-capping
   ```

3. **Sign up with weapon role:**
   ```
   x longbow
   ```

4. **Check your DMs** for gear requirements!

5. **Test multiple contents** to verify grace period fix:
   - Create 2+ contents with different mass times
   - Verify each gets its own grace period message in correct thread

---

## 💡 Future Enhancements

Potential additions based on this foundation:

1. **Image Upload Integration**
   - Allow hosts to upload gear images directly
   - Store in Discord CDN
   - Auto-populate GEAR_IMAGES

2. **Per-Role Gear Requirements**
   - Different DMs based on specific role
   - Weapon-specific loadout images

3. **Template Builder Command**
   - `/template create` to build templates in Discord
   - GUI-based template configuration

4. **Statistics Tracking**
   - Most popular templates
   - Absence rates per template
   - Performance analytics

5. **Role Substitution System**
   - "Can also play: X, Y, Z"
   - Auto-fill from bench when someone is absent

---

## ✅ Testing Checklist

- [x] Bot starts without errors
- [x] Generic templates work
- [x] Game-specific templates work
- [x] Gear DMs send successfully
- [x] Multiple contents don't overlap grace periods
- [x] Bench/absence don't duplicate
- [x] Role validation prevents invalid signups
- [x] Dynamic embeds update correctly
- [x] Voice state tracking works with new roles
- [x] Documentation is complete

---

## 🙏 Acknowledgments

Based on actual game content requirements provided by the community.
Templates designed for Cathedral Of Rat, Pure Tracking MLP, Faction Capping PvP, and 5 Man Tracking.

---

**Update completed successfully!** 🎉
