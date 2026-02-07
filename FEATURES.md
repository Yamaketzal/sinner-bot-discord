# Sinner Bot - Content Signup Features

## Overview
This bot manages group content signups with flexible role configurations, attendance tracking, and automatic absence management.

---

## Creating Content

### Basic Usage
```
/content start
  title: "Ava Roam"
  mass_time: "18:30"
  voice_channel: #your-vc
```

### Using Templates
Choose from predefined templates:

**Generic Templates:**
- **Small Dungeon**: 1 Tank, 1 Healer, 3 DPS, 1 Caller
- **Large Dungeon**: 2 Tank, 2 Healer, 6 DPS, 1 Caller
- **PvP Small**: 1 Tank, 1 Healer, 3 DPS, 2 Support, 1 Caller
- **PvP Large**: 2 Tank, 2 Healer, 5 DPS, 3 Support, 2 Catcher, 1 Caller
- **Raid**: 3 Tank, 3 Healer, 10 DPS, 4 Support, 1 Caller

**Game-Specific Templates (with auto DM gear requirements):**
- **🎯 Cathedral Of Rat**: 1 DPS, 1 Caller - Dungeon farming
- **🎯 Pure Tracking MLP**: Specialized tracking composition
- **🎯 Faction Capping PvP**: Full PvP faction capping setup
- **🎯 5 Man Tracking**: 1 Healer, 3 DPS, 1 Catcher - Small tracking team

```
/content start
  title: "Castle Siege"
  mass_time: "20:00"
  voice_channel: #pvp-vc
  template: pvp-large
```

### Custom Role Slots
Override template or create custom configurations:

```
/content start
  title: "Custom Run"
  mass_time: "19:00"
  voice_channel: #custom-vc
  tank_slots: 3
  healer_slots: 2
  dps_slots: 8
  support_slots: 4
  catcher_slots: 2
  caller_slots: 1
```

### Max Players Limit
Set a maximum player count. Excess signups automatically go to bench:

```
/content start
  title: "Limited Raid"
  mass_time: "21:00"
  voice_channel: #raid-vc
  template: raid
  max_players: 20
```

---

## Roles Available

| Role | Icon | Aliases | Description |
|------|------|---------|-------------|
| **Tank** | 🛡️ | `tank` | Frontline defenders |
| **Healer** | 💖 | `healer`, `heal`, `xheal` | Support healing |
| **DPS** | ⚔️ | `dps`, `mdps`, `rdps`, `melee`, `range` | Damage dealers |
| **Support** | ✨ | `support`, `supp` | Utility/buffs |
| **Catcher** | 🎯 | `catcher`, `catch`, `ganker` | Ganking/catching |
| **Caller** | 📣 | `caller`, `call` | Shot caller |
| **Bench** | 🪑 | `bench` | Waiting list |

### Game-Specific Roles (for special templates)

| Role | Icon | Aliases | Used In |
|------|------|---------|---------|
| **Dreadstorm** | ⚡ | `dreadstorm` | Pure Tracking MLP |
| **Hallowfall** | 🌟 | `hallowfall` | Pure Tracking, Faction Capping |
| **Cursed Staff** | 💀 | `cursed`, `staff` | Pure Tracking MLP |
| **Dagger/Bolt** | 🗡️ | `daggerbolt`, `bolt`, `boltcaster` | Pure Tracking MLP |
| **Dagger/Reaper** | ⚔️ | `daggerreaper`, `reaper` | Pure Tracking MLP |
| **Heavymace** | 🔨 | `heavymace`, `mace` | Faction Capping |
| **Truebolt/Oath/Root** | 🛡️ | `truebolt`, `oath`, `root` | Faction Capping |
| **Redemption/Blight** | ✨ | `redemption`, `blight` | Faction Capping |
| **Realmbreaker** | ⚒️ | `realmbreaker`, `realm` | Faction Capping |
| **Carving/Rotcaller** | 🪓 | `carving`, `rotcaller` | Faction Capping |
| **Demonfang/Battlebracer** | 👊 | `demonfang`, `bracer` | Faction Capping |
| **Longbow** | 🏹 | `longbow`, `bow` | Faction Capping |

---

## Gear Requirements (Auto DM)

When you sign up for a **game-specific template**, you'll automatically receive a DM with:
- Detailed gear requirements for your role
- Content-specific rules and priorities
- Preparation timeline
- Special notes

**Example Templates with Gear DMs:**
- Cathedral Of Rat (boss swaps, rat set, holy staff)
- Pure Tracking MLP (guild gear provided)
- Faction Capping (T7 equivalent, 80+ specs)
- 5 Man Tracking (light gear, consumables)

---

## Signing Up

In the thread created for the content:

```
x dps        → Sign up as DPS
x tank       → Sign up as Tank
x healer     → Sign up as Healer
x support    → Sign up as Support
x catcher    → Sign up as Catcher
x caller     → Sign up as Caller
x bench      → Sign up for Bench
x out        → Withdraw from all roles
```

**Note:** You can only be in ONE role at a time. Signing up for a new role automatically removes you from your previous role.

---

## Attendance System

### How It Works

1. **Mass Time**: At the scheduled mass time, the bot checks who is in the voice channel
2. **Late Check** (at mass time):
   - Anyone NOT in the VC is marked as **"Late"**
   - Late users are tracked in the system
   
3. **Grace Period** (2 minutes after mass):
   - If a "Late" user joins the VC during grace period → Cleared from late status
   - If still not in VC after grace period → Moved to **"Absence"**
   
4. **Absence** (final):
   - User is removed from their role
   - User is added to "Absence" list
   - **NO RECOVERY** - even if they join later

### Zero Tolerance
- **All roles** including hosts/callers are subject to attendance checks
- No exceptions - everyone must be on time
- Late arrivals after grace period cannot rejoin the roster

---

## Host Controls

### Lock Signups
Prevent new signups or changes:
```
/content lock
```

### End Content
Delete the signup and clean up:
```
/content end
```

**Note:** Only the host who created the content can lock or end it.

---

## Role Icon System

### Adding Custom Weapon Icons

The bot supports weapon-specific icons. Edit `roleConfig.js` to add custom icons:

```javascript
// In roleConfig.js, add to WEAPON_ICONS:
const WEAPON_ICONS = {
  'dps:crystal-reaper': '💎⚔️',
  'dps:longbow': '🏹',
  'tank:shield': '🛡️',
  'healer:staff': '🔮',
  // Add your custom weapons here
}
```

### Future Enhancement Ideas
- Per-user weapon selection during signup
- Weapon-based role distribution
- Stat tracking per weapon type

---

## Examples

### Example 1: Quick Dungeon Run
```
/content start
  title: "Quick Ava"
  mass_time: "18:00"
  voice_channel: #dungeon-vc
  template: small-dungeon
```

### Example 2: Large PvP Event
```
/content start
  title: "Castle Siege"
  mass_time: "20:00"
  voice_channel: #pvp-vc
  template: pvp-large
  max_players: 25
```

### Example 3: Fully Custom
```
/content start
  title: "Special Event"
  mass_time: "19:30"
  voice_channel: #event-vc
  tank_slots: 5
  healer_slots: 5
  dps_slots: 15
  support_slots: 10
  max_players: 40
```

---

## Tips

1. **Use templates** for standard content to save time
2. **Set max_players** to prevent over-signups
3. **Lock signups** once your roster is complete
4. **Check attendance** in the thread after mass starts
5. **Be on time** - there's a 2-minute grace period only

---

## Customizing Gear Requirements

To add custom gear requirement images for templates:

1. Upload your gear image to a hosting service (Discord, Imgur, etc.)
2. Edit `gameTemplates.js`
3. Update the `imageUrl` field in `GEAR_IMAGES`:

```javascript
const GEAR_IMAGES = {
  'cathedral-rat': {
    imageUrl: 'https://your-image-url-here.png',
    description: '...'
  }
}
```

4. Restart the bot

Users will now see the image in their DMs when they sign up!

---

## Support

For issues or questions, contact the bot administrator.
