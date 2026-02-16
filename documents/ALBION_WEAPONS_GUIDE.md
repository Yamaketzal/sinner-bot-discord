# 🗡️ Albion Weapons System Guide

## Overview
The bot now supports weapon-specific role signups for Albion Online content. Instead of generic roles like "DPS" or "Healer", you can create slots for specific weapons like "Hallowfall" or "Blazing Staff".

---

## 📋 Quick Start

### 1. **View Available Weapons**
```
/weapons
```
- Shows all available Albion weapons
- Filter by role: `/weapons role:healer` or `/weapons role:dps`

### 2. **Create Weapon-Specific Slots**
```
/roster add weapon:hallowfall slots:2
```
- Creates 2 slots for Hallowfall healers
- The embed will show: ✝️ **Hallowfall (0/2)**

### 3. **Sign Up for Weapon Slots**
Users type in the thread:
```
x hallowfall
```
or
```
x blazing-staff
```

### 4. **View Current Roster**
```
/roster view
```
- Shows all configured weapon slots

### 5. **Remove Weapon Slot**
```
/roster remove weapon:hallowfall
```

---

## 🎮 Weapon Categories

### 🔥 **Fire Staffs (DPS)**
- Great Fire Staff: `x great-fire-staff`
- Infernal Staff: `x infernal-staff`
- Blazing Staff: `x blazing-staff`
- Brimstone Staff: `x brimstone-staff`

### ✝️ **Holy Staffs (Healer)**
- Great Holy Staff: `x great-holy-staff`
- Divine Staff: `x divine-staff`
- Hallowfall: `x hallowfall` ⭐
- Redemption: `x redemption` ⭐
- Sacred Scepter: `x sacred-scepter`

### 🌿 **Nature Staffs (Healer)**
- Great Nature Staff: `x great-nature-staff`
- Wild Staff: `x wild-staff`
- Druidic Staff: `x druidic-staff`
- Blight Staff: `x blight-staff` ⭐
- Rampant Staff: `x rampant-staff`

### 🔨 **Hammers (Tank)**
- Polehammer: `x polehammer`
- Great Hammer: `x great-hammer`
- Tombhammer: `x tombhammer`
- Grovekeeper: `x grovekeeper`
- Forge Hammer of Gaia: `x forge-hammer-of-gaia`

### 🏹 **Bows (DPS)**
- Longbow: `x longbow`
- Warbow: `x warbow`
- Whispering Bow: `x whispering-bow`
- Bow of Badon: `x bow-of-badon`
- Wailing Bow: `x wailing-bow`

### 🎯 **Crossbows (DPS)**
- Heavy Crossbow: `x heavy-crossbow`
- Light Crossbow: `x light-crossbow`
- Weeping Repeater: `x weeping-repeater`
- Siegebow: `x siegebow`
- Boltcasters: `x boltcasters`
- Energy Shaper: `x energy-shaper`

### ⚔️ **Swords (DPS)**
- Broadsword: `x broadsword`
- Claymore: `x claymore`
- Dual Swords: `x dual-swords`
- Clarent Blade: `x clarent-blade`
- Carving Sword: `x carving-sword`
- Galatine Pair: `x galatine-pair`

### 🪓 **Axes (DPS)**
- Battleaxe: `x battleaxe`
- Greataxe: `x greataxe`
- Halberd: `x halberd`
- Infernal Scythe: `x infernal-scythe`

### 🔨 **Maces (DPS)**
- Heavy Mace: `x heavy-mace`
- Forge Hammers: `x forge-hammers`
- Bedrock Mace: `x bedrock-mace`
- Incubus Mace: `x incubus-mace`

### 🗡️ **Daggers (DPS)**
- Dagger Pair: `x dagger-pair`
- Claws: `x claws`
- Bloodletter: `x bloodletter`
- Deathgivers: `x deathgivers`

### 🔱 **Spears (DPS)**
- Pike: `x pike`
- Glaive: `x glaive`
- Trinity Spear: `x trinity-spear`
- Spirithunter: `x spirithunter`

### 🥋 **Quarterstaffs (DPS)**
- Iron-clad Staff: `x iron-clad-staff`
- Double Bladed Staff: `x double-bladed-staff`
- Black Monk Stave: `x black-monk-stave`
- Soulscythe: `x soulscythe`

### ❄️ **Frost Staffs (Support/DPS)**
- Great Frost Staff: `x great-frost-staff`
- Glacial Staff: `x glacial-staff`
- Hoarfrost Staff: `x hoarfrost-staff`
- Icicle Staff: `x icicle-staff`

### ✨ **Arcane Staffs (DPS)**
- Great Arcane Staff: `x great-arcane-staff`
- Enigmatic Staff: `x enigmatic-staff`
- Witchwork Staff: `x witchwork-staff`
- Occult Staff: `x occult-staff`
- Evensong: `x evensong`

### 💀 **Curse Staffs (DPS)**
- Great Curse Staff: `x great-curse-staff`
- Demonic Staff: `x demonic-staff`
- Cursed Skull: `x cursed-skull`
- Shadowcaller: `x shadowcaller`

---

## 📸 Weapon Images

All weapons display their **Tier 8** variant images next to the role in the embed.

The images are pulled from Albion's official render API:
```
https://render.albiononline.com/v1/item/T8_[WEAPON_ID].png
```

Example: **Hallowfall** shows the Tier 8 Hallowfall icon ✝️

---

## 💡 Example Workflow

### Setting up a Dungeon Run with Specific Weapons

1. **Start content:**
   ```
   /content start title:"Ava Dungeon" mass_time:"20:00" voice_channel:#ava-runs
   ```

2. **Add weapon-specific roles:**
   ```
   /roster add weapon:hallowfall slots:1
   /roster add weapon:blight-staff slots:1
   /roster add weapon:polehammer slots:1
   /roster add weapon:blazing-staff slots:2
   /roster add weapon:boltcasters slots:2
   ```

3. **Users sign up in thread:**
   ```
   x hallowfall
   x blazing-staff
   x polehammer
   x boltcasters
   ```

4. **The embed shows:**
   ```
   ✝️ Hallowfall (1/1)
   1. @Player1

   🌿 Blight Staff (1/1)
   1. @Player2

   🔨 Polehammer (1/1)
   1. @Player3

   🔥 Blazing Staff (2/2)
   1. @Player4
   2. @Player5

   🎯 Boltcasters (2/2)
   1. @Player6
   2. @Player7
   ```

---

## 🎯 Features

### ✅ **Auto-complete Support**
- Type `/roster add weapon:` and start typing a weapon name
- The bot will show matching weapons with their role type

### ✅ **Flexible Signup**
- Users can type weapon names with spaces or dashes
- `x blazing staff` or `x blazing-staff` both work

### ✅ **Mixed Mode**
- You can use both weapon-specific slots AND generic roles (DPS, Tank, Healer) in the same content

### ✅ **Bench System**
- If a weapon slot is full, users are added to bench with their desired weapon noted

### ✅ **Images in Embed**
- Each weapon slot shows its Tier 8 icon image (when Discord supports it)

---

## 🌍 Zone Types (Future Feature)

The system also includes zone data for future features:

- 🔵 **Blue Zone** - Safe zones
- 🟡 **Yellow Zone** - Low-risk PvP
- 🔴 **Red Zone** - Full loot PvP
- ⚫ **Black Zone** - Extreme risk, best rewards
- 🟣 **Roads of Avalon** - Special randomized zones
- 🌫️ **Mists** - Solo/small group instances

---

## 🛠️ Technical Details

### Database Location
`albionData.js` contains:
- 80+ weapons with Tier 8 image URLs
- Weapon categories and role mappings
- Zone information
- Helper functions for weapon lookups

### Image API
Images use Albion's official render service:
```javascript
image: 'https://render.albiononline.com/v1/item/T8_2H_HOLYSTAFF_HELL.png'
```

---

## 📝 Notes

- Weapon names are **case-insensitive**
- Multi-word weapon names use **dashes**: `x forge-hammer-of-gaia`
- All weapons show their **emoji icon** in signups
- The system works alongside the existing generic role system
- Content Leads can mix weapon-specific and generic roles as needed

---

## 🎮 Popular Loadouts

### **Corrupted Dungeons (5-man)**
```
/roster add weapon:hallowfall slots:1
/roster add weapon:polehammer slots:1
/roster add weapon:blazing-staff slots:2
/roster add weapon:boltcasters slots:1
```

### **Ava Raids**
```
/roster add weapon:hallowfall slots:2
/roster add weapon:blight-staff slots:1
/roster add weapon:great-hammer slots:2
/roster add weapon:blazing-staff slots:3
/roster add weapon:boltcasters slots:2
```

### **PvP Ganking Squad**
```
/roster add weapon:bloodletter slots:2
/roster add weapon:clarent-blade slots:1
/roster add weapon:infernal-scythe slots:2
/roster add weapon:weeping-repeater slots:2
```

---

*Last updated: February 2026*
*For support, contact a Content Lead*
