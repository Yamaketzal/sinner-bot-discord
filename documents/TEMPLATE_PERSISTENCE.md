# 💾 Weapon Template Persistence System

## Overview
All weapon templates are now **automatically saved** to `weapon_templates.json` and will persist across bot restarts, updates, and redeployments.

---

## How It Works

### 📂 Storage File
- **File:** `weapon_templates.json`
- **Location:** Root directory of the bot
- **Format:** JSON (human-readable)

### 🔄 Automatic Saving
Every time you:
- ✅ Create a template (`/template create`)
- ✅ Add a weapon (`/template add-weapon`)
- ✅ Remove a weapon (`/template remove-weapon`)
- ✅ Delete a template (`/template delete`)

The system **automatically saves** all changes to `weapon_templates.json`.

### 📥 Automatic Loading
When the bot starts:
- Automatically loads all templates from `weapon_templates.json`
- Displays: `✅ Loaded X weapon templates from file`
- If no file exists: `📝 No existing weapon templates file found. Starting fresh.`

---

## Example Storage Format

```json
{
  "5man-tracking": {
    "weapons": {
      "crystal-reaper": 2,
      "incubus-mace": 1,
      "hallowfall": 1,
      "shadowcaller": 1
    },
    "description": "Standard 5-man tracking composition"
  },
  "ava-standard": {
    "weapons": {
      "hallowfall": 2,
      "blight-staff": 2,
      "blazing-staff": 5,
      "boltcasters": 3
    },
    "description": "Standard Ava roam setup"
  }
}
```

---

## Benefits

✅ **No data loss** on bot restart  
✅ **Survives code updates** and redeployments  
✅ **Easy backup** - just copy the JSON file  
✅ **Human-readable** - can manually edit if needed  
✅ **Automatic** - no manual save commands needed  

---

## Backup & Recovery

### Creating a Backup
```powershell
# Windows PowerShell
Copy-Item weapon_templates.json weapon_templates_backup.json
```

### Restoring from Backup
```powershell
# Windows PowerShell
Copy-Item weapon_templates_backup.json weapon_templates.json
```

### Transferring to New Server
1. Copy `weapon_templates.json` from old bot directory
2. Paste into new bot directory
3. Start the bot
4. All templates automatically loaded!

---

## Important Notes

⚠️ **Git Ignore:** The file is in `.gitignore` to prevent accidentally committing server-specific templates  
⚠️ **Manual Edits:** You can manually edit the JSON file, but restart the bot to load changes  
⚠️ **File Permissions:** Ensure the bot has write permissions in its directory  

---

## Troubleshooting

### Templates Not Loading?
1. Check if `weapon_templates.json` exists
2. Verify JSON syntax is valid (use online JSON validator)
3. Check bot console for error messages
4. Ensure file isn't corrupted

### Templates Not Saving?
1. Check bot has write permissions
2. Look for error messages in console: `❌ Error saving weapon templates`
3. Check disk space

### Lost Templates?
1. Check for backup file: `weapon_templates_backup.json`
2. Check if file was accidentally deleted
3. Recreate templates using `/template` commands

---

*Last Updated: February 16, 2026*  
*Templates are forever! 🎮*
