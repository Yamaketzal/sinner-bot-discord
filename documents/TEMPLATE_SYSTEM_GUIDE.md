# ⚔️ NEW Weapon Template System - Quick Start Guide

## ✅ What Changed

### REMOVED:
- ❌ `/roster add` command (too complicated)
- ❌ `/roster remove` command
- ❌ `/roster view` command
- ❌ Manual roster management per content

### ADDED:
- ✅ `/template` commands - Save and reuse weapon setups
- ✅ Weapon aliases - Use nicknames like "hallow" instead of "hallowfall"
- ✅ Auto-complete for templates
- ✅ Thread commands work properly now

---

## 🎯 How It Works Now

### Step 1: Create a Template (One Time Setup)
```
/template create name:ava-standard description:Standard Ava raid setup
```

### Step 2: Add Weapons to Template
```
/template add-weapon template:ava-standard weapon:hallow slots:2
/template add-weapon template:ava-standard weapon:blight slots:1
/template add-weapon template:ava-standard weapon:pole slots:2
/template add-weapon template:ava-standard weapon:blaze slots:3
/template add-weapon template:ava-standard weapon:bolt slots:2
```

### Step 3: Use Template When Starting Content
```
/content start title:"Ava Raid" mass_time:"20:00" voice_channel:#ava weapon_template:ava-standard
```

That's it! The template automatically loads all weapons into the signup.

---

## 🔥 Weapon Aliases (Shortcuts)

Users can now use SHORT NAMES when signing up:

| Type This | Means This |
|-----------|------------|
| `x hallow` | Hallowfall |
| `x blaze` | Blazing Staff |
| `x bolt` | Boltcasters |
| `x pole` | Polehammer |
| `x perma` | Permafrost Prism |
| `x weep` | Weeping Repeater |
| `x blood` | Bloodletter |
| `x shadow` | Shadowcaller |
| `x demon` | Demonic Staff |
| `x glacial` | Glacial Staff |

**Full list of 100+ aliases in `weaponTemplates.js`!**

---

## 📋 Template Commands

### Create Template
```
/template create name:my-template description:Optional description
```

### Add Weapon to Template
```
/template add-weapon template:my-template weapon:hallowfall slots:2
```
- Uses autocomplete for template names
- Uses autocomplete for weapon names
- Accepts weapon aliases! (e.g., "hallow" or "hallowfall")

### Remove Weapon from Template
```
/template remove-weapon template:my-template weapon:hallowfall
```

### View Template Details
```
/template view template:my-template
```

### List All Templates
```
/template view
```
(Leave template option empty to see all)

### Delete Template
```
/template delete template:my-template
```

---

## 🎮 Example Workflow

### Creating a Standard Ava Template:
```
1. /template create name:ava-10man description:Standard 10-man Ava raid

2. /template add-weapon template:ava-10man weapon:hallow slots:2
3. /template add-weapon template:ava-10man weapon:blight slots:1
4. /template add-weapon template:ava-10man weapon:pole slots:2
5. /template add-weapon template:ava-10man weapon:blaze slots:3
6. /template add-weapon template:ava-10man weapon:bolt slots:2

7. /template view template:ava-10man  (verify it looks good)
```

### Using the Template:
```
/content start 
  title:"Ava Raid" 
  mass_time:"20:00" 
  voice_channel:#ava-runs 
  weapon_template:ava-10man
```

### Users Sign Up:
```
x hallow
x blaze
x bolt
x pole
```

---

## 🌟 Benefits

1. **Save Time**: Create template once, reuse forever
2. **Less Errors**: No manual adding each time
3. **Easy Signups**: Users can use short names
4. **Consistent**: Same setup every time
5. **Flexible**: Override with custom slots if needed

---

## ⚡ Popular Templates to Create

### Ava 10-Man:
```
/template create name:ava-10man
/template add-weapon template:ava-10man weapon:hallowfall slots:2
/template add-weapon template:ava-10man weapon:blight-staff slots:1
/template add-weapon template:ava-10man weapon:polehammer slots:2
/template add-weapon template:ava-10man weapon:blazing-staff slots:3
/template add-weapon template:ava-10man weapon:boltcasters slots:2
```

### Small Dungeon 5-Man:
```
/template create name:small-dungeon
/template add-weapon template:small-dungeon weapon:hallowfall slots:1
/template add-weapon template:small-dungeon weapon:polehammer slots:1
/template add-weapon template:small-dungeon weapon:blazing-staff slots:2
/template add-weapon template:small-dungeon weapon:boltcasters slots:1
```

### Ganking Squad:
```
/template create name:ganking
/template add-weapon template:ganking weapon:bloodletter slots:3
/template add-weapon template:ganking weapon:clarent-blade slots:2
/template add-weapon template:ganking weapon:weeping-repeater slots:2
```

---

## 🔧 Troubleshooting

**Q: Template not showing in autocomplete?**
- Check spelling with `/template view` (lists all)

**Q: Users can't sign up with weapon alias?**
- Check `weaponTemplates.js` for supported aliases
- Tell them to use full name if alias doesn't exist

**Q: /content end not working in thread?**
- Fixed! It now works from anywhere

**Q: Need to modify a template?**
- Use `/template remove-weapon` then `/template add-weapon` again
- Or delete and recreate: `/template delete` then `/template create`

---

## 📱 Quick Command Reference

| Command | What It Does |
|---------|--------------|
| `/template create` | Make new template |
| `/template add-weapon` | Add weapon to template |
| `/template remove-weapon` | Remove weapon from template |
| `/template view` | See template details or list all |
| `/template delete` | Delete template |
| `/content start` + `weapon_template:` | Start content with template |
| `/weapons` | Browse all available weapons |
| `x [alias]` | Sign up with weapon (supports aliases!) |

---

*Updated: February 16, 2026*  
*Bot Version: 2.0 - Template System*
