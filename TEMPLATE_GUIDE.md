# Game Templates Guide

This file explains how to add, modify, or remove game-specific content templates.

## Adding a New Template

1. **Define the template in `gameTemplates.js`:**

```javascript
const GAME_TEMPLATES = {
  // ... existing templates ...
  
  'your-template-key': {
    name: 'Your Content Name',
    type: 'dungeon', // or 'pvp', 'tracking', etc.
    roles: {
      // Define roles and their slot counts
      tank: 2,
      healer: 1,
      your_custom_role: 3
    },
    gearRequirements: {
      all: [
        'Requirement 1',
        'Requirement 2',
        // Add more requirements
      ],
      prepTime: 30 // minutes before mass (optional)
    }
  }
}
```

2. **Add role display names if you have custom roles:**

```javascript
const GAME_ROLE_DISPLAY = {
  // ... existing roles ...
  your_custom_role: 'Your Custom Role Display Name'
}
```

3. **Add role icons:**

```javascript
const GAME_ROLE_ICONS = {
  // ... existing icons ...
  your_custom_role: '🎯' // Choose an emoji
}
```

4. **Add gear requirement details:**

```javascript
const GEAR_IMAGES = {
  // ... existing gear images ...
  'your-template-key': {
    imageUrl: 'https://your-hosted-image-url.png', // Optional
    description: '**Required Items:**\n' +
      '• Item 1\n' +
      '• Item 2\n' +
      '\n**Rules:**\n' +
      '• Rule 1\n' +
      '• Rule 2'
  }
}
```

5. **Add the template to the slash command choices in `index.js`:**

Find the `.addStringOption` for 'template' and add your choice:

```javascript
.addChoices(
  // ... existing choices ...
  { name: '🎯 Your Content Name', value: 'your-template-key' }
)
```

6. **Add role aliases in `index.js`:**

```javascript
const ROLE_ALIASES = {
  // ... existing aliases ...
  customrole: 'your_custom_role',
  cr: 'your_custom_role',
  // Add multiple aliases
}
```

7. **Update `roleConfig.js`:**

Add your template key to the TEMPLATES object:

```javascript
const TEMPLATES = {
  // ... existing templates ...
  'your-template-key': null
}
```

## Example: Adding a "Mist Dungeon" Template

### 1. gameTemplates.js

```javascript
const GAME_TEMPLATES = {
  'mist-dungeon': {
    name: 'Mist Dungeon 5-Man',
    type: 'dungeon',
    roles: {
      tank: 1,
      healer: 1,
      dps: 2,
      scout: 1
    },
    gearRequirements: {
      all: [
        'T6+ gear minimum',
        'Healing potions required',
        'Scout needs invisibility potion',
        'Tank needs shield spell'
      ],
      prepTime: 15
    }
  }
}

const GAME_ROLE_DISPLAY = {
  scout: 'Scout/Explorer'
}

const GAME_ROLE_ICONS = {
  scout: '🔍'
}

const GEAR_IMAGES = {
  'mist-dungeon': {
    imageUrl: null,
    description: '**Required:**\n' +
      '• T6+ Equipment\n' +
      '• Healing Potions\n' +
      '• Invis Potion (Scout)\n' +
      '• Shield Spell (Tank)'
  }
}
```

### 2. index.js - Add choice

```javascript
{ name: '🎯 Mist Dungeon 5-Man', value: 'mist-dungeon' }
```

### 3. index.js - Add aliases

```javascript
scout: 'scout',
explore: 'scout',
explorer: 'scout',
```

### 4. roleConfig.js

```javascript
'mist-dungeon': null
```

## Testing Your Template

1. Restart the bot
2. Run `/content start`
3. Select your template from the dropdown
4. Sign up with `x scout` (or your custom role)
5. Check your DMs for gear requirements

## Tips

- Keep role names lowercase with underscores (e.g., `cursed_staff`)
- Use clear, descriptive display names
- Choose emoji icons that represent the role
- Test DMs work by signing up yourself
- Keep gear descriptions concise but clear
- Use Discord markdown for formatting in descriptions

## Gear Requirement Image Hosting

Free options for hosting images:
- Discord CDN (upload to a Discord channel, copy link)
- Imgur (https://imgur.com)
- GitHub (in your repo's assets)
- Google Drive (make public, use direct link)

**Note:** Make sure the image URL is a direct link ending in `.png`, `.jpg`, or `.gif`

## Troubleshooting

**Template doesn't show up:**
- Check the template key matches in all files
- Restart the bot after changes
- Check console for errors

**DM not sending:**
- Verify GEAR_IMAGES key matches template key
- Check if user has DMs enabled
- Look at console for DM errors

**Role not recognized:**
- Add all aliases to ROLE_ALIASES
- Ensure role exists in template's roles object
- Check spelling matches exactly

**Icon not showing:**
- Use valid Discord emoji or Unicode emoji
- Some emoji may not display on all platforms
- Test with common emoji first
