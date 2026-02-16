# 🎯 Custom Roles & Flexible Weapons Guide

## Overview
You can now create **custom role names** for weapons in templates, allowing for:
- General role categories (e.g., "SPAM DPS")
- Specific requirements (e.g., "High DPS (Royal Robe)")
- Flexible weapon choices (e.g., "Blazing OR Lightcaller")

---

## ✨ NEW: Shapeshifter Weapons Added

### Available Shapeshifter Weapons:
| Weapon | Alias | Role | Emoji |
|--------|-------|------|-------|
| Shapeshifter Staff | `shapeshifter` | DPS | 🐺 |
| Wildfire Staff | `wildfire` | DPS | 🔥 |
| Bear Paws | `bear`, `bearpaws` | Tank | 🐻 |
| Ursine Maulers | `ursine`, `maulers` | Tank | 🐻 |

---

## 🎨 Creating Custom Role Names

### Basic Syntax:
```
/template add-weapon template:NAME weapon:WEAPON slots:NUMBER custom_role_name:"CUSTOM NAME"
```

### Example 1: SPAM DPS (General Role)
```
/template create name:group-dungeon description:"Standard group dungeon composition"
/template add-weapon template:group-dungeon weapon:blazing-staff slots:2 custom_role_name:"SPAM DPS"
```

**Result in Embed:**
```
🔥 SPAM DPS (0/2)
—
```

**Users can signup with:**
```
x blazing-staff
x blaze
x spam dps (if the actual weapon is blazing-staff)
```

### Example 2: High DPS with Gear Requirement
```
/template add-weapon template:group-dungeon weapon:dual-swords slots:1 custom_role_name:"High DPS (Royal Robe)"
```

**Result in Embed:**
```
⚔️ High DPS (Royal Robe) (0/1)
—
```

### Example 3: Flexible Weapon Choices
```
/template add-weapon template:ava-roam weapon:blazing-staff slots:1 custom_role_name:"Blazing OR Lightcaller"
```

**Result in Embed:**
```
🔥 Blazing OR Lightcaller (0/1)
—
```

**Note:** Users can still only sign up with the base weapon (`x blazing-staff`), but the display name shows flexibility.

---

## 📋 Real-World Examples

### Example: Group Dungeon Template (From Your Image)

```bash
# Create template
/template create name:group-dungeon description:"Martlock portal, gears provided, lootsplit aside from silver bags, 3 maps duration, 5 UTC"

# Add Tank
/template add-weapon template:group-dungeon weapon:polehammer slots:1 custom_role_name:"Tank"

# Add Healer
/template add-weapon template:group-dungeon weapon:hallowfall slots:1 custom_role_name:"Healer"

# Add High DPS with specific gear
/template add-weapon template:group-dungeon weapon:dual-swords slots:1 custom_role_name:"High DPS (Royal robe)"

# Add Shadowcaller
/template add-weapon template:group-dungeon weapon:shadowcaller slots:1 custom_role_name:"Shadowcaller"

# Add Badon
/template add-weapon template:group-dungeon weapon:bow-of-badon slots:1 custom_role_name:"Badon"

# Add SPAM DPS slots (flexible weapons)
/template add-weapon template:group-dungeon weapon:blazing-staff slots:2 custom_role_name:"SPAM DPS"
```

### Result in Discord:

```
⚔ GROUP DUNGEON

Host: @Join TheBald
🕒 Mass Time (UTC): 10:01 AM
🔊 Voice Channel: #Gaming comms 2

📋 Content Info:
Martlock portal
Gears provided
Lootsplit aside from silver bags
3 maps duration
5 UTC

🔨 Tank (0/1)
—

✝️ Healer (0/1)
—

⚔️ High DPS (Royal robe) (0/1)
—

💀 Shadowcaller (0/1)
—

🏹 Badon (0/1)
—

🔥 SPAM DPS (0/2)
—

🪑 Bench
—

🚫 Absence
—
```

---

## 🎮 User Signup Examples

### With Custom Names:
Users **still sign up using the weapon alias/name**, not the custom role name:

```
x polehammer          → Signs up for "Tank"
x hallow              → Signs up for "Healer"
x dual                → Signs up for "High DPS (Royal robe)"
x shadowcaller        → Signs up for "Shadowcaller"
x badon               → Signs up for "Badon"
x blazing-staff       → Signs up for "SPAM DPS"
x blaze               → Signs up for "SPAM DPS"
```

### Bot Confirmation:
```
✅ Signed up as 🔥 SPAM DPS
✅ Signed up as ⚔️ High DPS (Royal robe)
✅ Signed up as 🔨 Tank
```

---

## 📊 Viewing Templates

### View Specific Template:
```
/template view template:group-dungeon
```

**Output:**
```
⚔️ Template: group-dungeon
Martlock portal, gears provided, lootsplit aside from silver bags, 3 maps duration, 5 UTC

Weapons:
🔨 Tank x1
✝️ Healer x1
⚔️ High DPS (Royal robe) x1
💀 Shadowcaller x1
🏹 Badon x1
🔥 SPAM DPS x2
```

---

## 💡 Use Cases

### 1. **General Role Categories**
```
custom_role_name:"SPAM DPS"
custom_role_name:"Support"
custom_role_name:"Flex Pick"
```

### 2. **Gear Requirements**
```
custom_role_name:"Tank (8.3 minimum)"
custom_role_name:"Healer (Cleric Robe)"
custom_role_name:"DPS (Royal Armor)"
```

### 3. **Flexible Weapon Choices**
```
custom_role_name:"Blazing OR Lightcaller"
custom_role_name:"Any Nature Staff"
custom_role_name:"Tank (Polehammer/Grovekeeper)"
```

### 4. **Specific Instructions**
```
custom_role_name:"Shadowcaller (Mage Cowl)"
custom_role_name:"Badon (Bring Poison Potions)"
custom_role_name:"High DPS (No Bow)"
```

---

## ⚙️ Technical Notes

### Backward Compatibility:
- ✅ Old templates (without custom names) still work perfectly
- ✅ Weapon autocomplete unchanged
- ✅ All weapon aliases work the same

### Data Storage:
Custom role names are stored in `weapon_templates.json`:

```json
{
  "group-dungeon": {
    "weapons": {
      "polehammer": {
        "slots": 1,
        "customName": "Tank"
      },
      "blazing-staff": {
        "slots": 2,
        "customName": "SPAM DPS"
      }
    },
    "description": "Standard group dungeon composition"
  }
}
```

---

## 🚀 Quick Start

### Step 1: Create Template
```
/template create name:my-content description:"My awesome content"
```

### Step 2: Add Weapons with Custom Names
```
/template add-weapon template:my-content weapon:hallowfall slots:2 custom_role_name:"Healer"
/template add-weapon template:my-content weapon:blazing-staff slots:5 custom_role_name:"SPAM DPS"
/template add-weapon template:my-content weapon:boltcasters slots:3 custom_role_name:"Range DPS (8.1+)"
```

### Step 3: Start Content
```
/content start title:"My Content" mass_time:18:00 voice_channel:#Gaming comms 2 weapon_template:my-content
```

### Step 4: Users Signup
```
x hallow     → Signs up as "Healer"
x blaze      → Signs up as "SPAM DPS"
x bolt       → Signs up as "Range DPS (8.1+)"
```

---

## ❓ FAQ

**Q: Can users type the custom role name to signup?**  
A: No, they must use the weapon name/alias (e.g., `x blazing-staff` not `x SPAM DPS`)

**Q: Can I change a custom role name later?**  
A: Yes! Just use `/template add-weapon` again with the same weapon and new custom name

**Q: Do I have to use custom names?**  
A: No! If you don't provide `custom_role_name`, it shows the default weapon name

**Q: Can I have multiple weapons with the same custom name?**  
A: Each weapon slot is separate. If you want "SPAM DPS x5", add one weapon entry with slots:5

---

*Last Updated: February 16, 2026*  
*Get creative with your role names! 🎨*
