# 🎯 Adaptive Template System - Foundation

## Philosophy
**The template system is now FULLY FLEXIBLE.** Content Leads define roles however they want using custom names. The same weapon can be used for different purposes depending on the custom name.

---

## ✨ Key Changes

### 1. **Weapons Are Now Role-Agnostic**
- ❌ Removed: `role`, `image` fields from weapons
- ✅ Kept: `name`, `category`, `emoji` only
- 💡 **Why:** Weapons can serve multiple roles depending on context

### 2. **Custom Names Define Usage**
The `custom_role_name` field is now the PRIMARY way to define what a weapon slot is for:

```bash
# Same weapon, different uses:
/template add-weapon weapon:permafrost-prism slots:1 custom_role_name:"Caller"
/template add-weapon weapon:permafrost-prism slots:2 custom_role_name:"SPAM DPS"
/template add-weapon weapon:permafrost-prism slots:1 custom_role_name:"Support CC"

# Same weapon, different gear requirements:
/template add-weapon weapon:lifecurse-staff slots:1 custom_role_name:"DPS (Royal Armor)"
/template add-weapon weapon:lifecurse-staff slots:1 custom_role_name:"Support (Cleric Robe)"
```

### 3. **New Shapeshifter Weapons** (Fixed from image)
| Weapon | Alias | Emoji |
|--------|-------|-------|
| Prowling Staff | `prowling` | 🐺 |
| Rootbound Staff | `rootbound` | 🌳 |
| Primal Staff | `primal` | 🦁 |
| Bloodmoon Staff | `bloodmoon` | 🌙 |
| Hellspawn Staff | `hellspawn` | 👹 |
| Earthrune Staff | `earthrune` | 🪨 |
| Lightcaller | `lightcaller` | ✨ |

---

## 📋 Real-World Examples from Your Images

### Example 1: Group Dungeon
```bash
/template create name:group-dungeon description:"Martlock portal, gears provided, lootsplit"

# Specific weapon + role name
/template add-weapon template:group-dungeon weapon:polehammer slots:1 custom_role_name:"Tank"

/template add-weapon template:group-dungeon weapon:hallowfall slots:1 custom_role_name:"Healer"

# Weapon + gear requirement
/template add-weapon template:group-dungeon weapon:dual-swords slots:1 custom_role_name:"High DPS (Royal robe)"

/template add-weapon template:group-dungeon weapon:shadowcaller slots:1 custom_role_name:"Shadowcaller"

# Specific weapon mention
/template add-weapon template:group-dungeon weapon:bow-of-badon slots:1 custom_role_name:"Badon"

# Generic role (flexible weapon choice)
/template add-weapon template:group-dungeon weapon:blazing-staff slots:2 custom_role_name:"SPAM DPS"
```

**Result:**
```
🔨 Tank (0/1)
✝️ Healer (0/1)
⚔️ High DPS (Royal robe) (0/1)
💀 Shadowcaller (0/1)
🏹 Badon (0/1)
🔥 SPAM DPS (0/2)
```

### Example 2: Faction Capping (PvP)
```bash
/template create name:faction-capping description:"PvP ready, T7+ equivalent, 80 specs"

# Caller role
/template add-weapon template:faction-capping weapon:permafrost-prism slots:1 custom_role_name:"Caller"

# Tank role
/template add-weapon template:faction-capping weapon:incubus-mace slots:1 custom_role_name:"Heavymace"

# Healers
/template add-weapon template:faction-capping weapon:hallowfall slots:1 custom_role_name:"Hallowfall"

# Support/DPS hybrid
/template add-weapon template:faction-capping weapon:realmbreaker slots:1 custom_role_name:"Realmbreaker"

# Flexible DPS (Carving OR alternatives)
/template add-weapon template:faction-capping weapon:carving-sword slots:1 custom_role_name:"Carving"

# Range DPS options
/template add-weapon template:faction-capping weapon:demonfang slots:1 custom_role_name:"Demonfang/Battlebracer"
/template add-weapon template:faction-capping weapon:longbow slots:1 custom_role_name:"Longbow"
```

### Example 3: Pure Tracking in MLP
```bash
/template create name:tracking-mlp description:"Gears provided, silver bags for guild, no specs needed"

# Tank role
/template add-weapon template:tracking-mlp weapon:tombhammer slots:1 custom_role_name:"Dreadstorm"

# Healer
/template add-weapon template:tracking-mlp weapon:hallowfall slots:1 custom_role_name:"Hallowfall"

# Curse staff support
/template add-weapon template:tracking-mlp weapon:cursed-skull slots:1 custom_role_name:"Cursed Staff"

# Flexible DPS options (show multiple choices)
/template add-weapon template:tracking-mlp weapon:bloodletter slots:2 custom_role_name:"Dagger or Boltcaster"
/template add-weapon template:tracking-mlp weapon:crystal-reaper slots:2 custom_role_name:"Dagger or Reaper"
```

---

## 🎮 Advanced Use Cases

### 1. **Same Weapon, Multiple Roles**
Content Leads can add the same weapon multiple times with different custom names:

```bash
# Permafrost for different purposes
/template add-weapon weapon:permafrost-prism slots:1 custom_role_name:"Caller (Permafrost)"
/template add-weapon weapon:permafrost-prism slots:2 custom_role_name:"SPAM DPS (Frost)"
/template add-weapon weapon:permafrost-prism slots:1 custom_role_name:"Support CC"
```

### 2. **Non-Weapon Roles**
You can add ANY role, even non-weapons:

```bash
# Battlemounts (not a weapon!)
/template add-weapon weapon:polehammer slots:2 custom_role_name:"Battlemounts"

# Scout role
/template add-weapon weapon:bloodletter slots:1 custom_role_name:"Scout (Speedy Build)"

# Flex pick
/template add-weapon weapon:blazing-staff slots:3 custom_role_name:"Flex DPS (Bring Best)"
```

### 3. **Specific Gear/Build Requirements**
```bash
# Defensive vs Offensive tanks
/template add-weapon weapon:polehammer slots:1 custom_role_name:"Defensive Tank (Plate)"
/template add-weapon weapon:incubus-mace slots:1 custom_role_name:"Offensive Tank (8.3)"

# Different DPS types
/template add-weapon weapon:blazing-staff slots:2 custom_role_name:"RDPS (Range)"
/template add-weapon weapon:witchwork-staff slots:1 custom_role_name:"MDPS (Magic)"
/template add-weapon weapon:bloodletter slots:2 custom_role_name:"1-Shot DPS"

# Support variations
/template add-weapon weapon:lifecurse-staff slots:1 custom_role_name:"Support (Remove Buff)"
/template add-weapon weapon:permafrost-prism slots:1 custom_role_name:"Support (CC/Pierce)"
/template add-weapon weapon:hallowfall slots:1 custom_role_name:"Support (Defensive Heals)"
```

---

## 🏗️ System Architecture

### How It Works:
1. **Template Creator** adds weapons with custom names
2. **Custom name** defines the role/usage/requirements
3. **Users** sign up with weapon alias: `x permafrost`, `x bloodletter`, etc.
4. **Embed** displays the custom name, NOT the weapon name
5. **Confirmation** shows custom name: `✅ Signed up as 🔥 Caller (Permafrost)`

### Data Flow:
```
Template:
{
  "weapons": {
    "permafrost-prism": {
      "slots": 1,
      "customName": "Caller"
    }
  }
}

↓

Content Start:
weaponRoles: {
  "permafrost-prism": {
    weapon: { name: "Permafrost Prism", emoji: "❄️", category: "frost_staff" },
    slots: 1,
    customName: "Caller",
    signups: []
  }
}

↓

Embed Display:
❄️ Caller (0/1)

↓

User Signup: "x permafrost"

↓

Confirmation: "✅ Signed up as ❄️ Caller"
```

---

## 💡 Best Practices

### 1. **Be Descriptive**
```bash
# ❌ Too vague
custom_role_name:"DPS"

# ✅ Descriptive
custom_role_name:"SPAM DPS (Fire/Frost)"
custom_role_name:"High DPS (Royal Robe Required)"
```

### 2. **Show Flexibility**
```bash
# ✅ Multiple weapon options
custom_role_name:"Dagger OR Boltcaster"
custom_role_name:"Any Nature Staff"
custom_role_name:"Tank (Pole/Grove/Incubus)"
```

### 3. **Include Requirements**
```bash
# ✅ Gear/spec requirements
custom_role_name:"Caller (80+ Specs)"
custom_role_name:"Tank (8.3 minimum)"
custom_role_name:"Healer (Cleric Robe)"
```

### 4. **Use for Non-Weapons**
```bash
# ✅ Special roles
custom_role_name:"Battlemounts"
custom_role_name:"Scout"
custom_role_name:"Flex Pick (Bring Best Build)"
```

---

## 🔮 Future Adaptations

The system is built to be extended. Future features could include:

1. **Multiple Weapon Options per Slot**
   - Allow users to pick from 2-3 weapons for one slot
   - Example: `x hallowfall` OR `x blight` for "Healer" slot

2. **Auto-Role Detection**
   - Smart matching: `x caller` auto-matches to "Caller" custom role

3. **Build Templates**
   - Store full builds (weapon + armor + food) per role

4. **IP/Spec Requirements**
   - Auto-check user's IP/specs before allowing signup

5. **Flexible Signup Syntax**
   - `x permafrost caller` → Signs up for Permafrost in Caller role

---

## 📝 Summary

### ✅ What's New:
- Weapons have NO fixed roles anymore
- Custom names define EVERYTHING
- Same weapon can be used for different purposes
- Shapeshifter weapons added and fixed
- Full flexibility for Content Leads

### 🎯 Core Concept:
**The template maker is in FULL CONTROL.** They define:
- What weapons are needed
- What those weapons are used for (via custom name)
- How many of each role
- What gear/specs/requirements apply

The bot simply enforces the structure they create!

---

*Last Updated: February 16, 2026*  
*Foundation complete. Ready for future iterations! 🚀*
