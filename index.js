require('dotenv').config()
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js')

const store = require('./store')
const { TEMPLATES, ROLE_ICONS, ROLE_DISPLAY_NAMES, getRoleIcon } = require('./roleConfig')
const { GAME_TEMPLATES, GAME_ROLE_DISPLAY, GAME_ROLE_ICONS, GEAR_IMAGES } = require('./gameTemplates')

const GUILD_ID = '1360620690323148800'


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
})


/* 1️⃣ Define a test command */
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test command'),

  new SlashCommandBuilder()
    .setName('content')
    .setDescription('Content commands')

    // /content start
    .addSubcommand(sub =>
      sub
        .setName('start')
        .setDescription('Start a content signup')
        .addStringOption(opt =>
          opt
            .setName('title')
            .setDescription('Content title (e.g. Ava Roam)')
            .setRequired(true)
        )
        .addStringOption(opt =>
          opt
            .setName('mass_time')
            .setDescription('Mass time in UTC (HH:MM)')
            .setRequired(true)
        )
        .addChannelOption(opt =>
          opt
            .setName('voice_channel')
            .setDescription('Voice channel for mass')
            .setRequired(true)
        )
        .addStringOption(opt =>
          opt
            .setName('template')
            .setDescription('Pick a template (optional)')
            .setRequired(false)
            .addChoices(
              { name: 'Small Dungeon (1T/1H/3D/1C)', value: 'small-dungeon' },
              { name: 'Large Dungeon (2T/2H/6D/1C)', value: 'large-dungeon' },
              { name: 'PvP Small (1T/1H/3D/2S/1C)', value: 'pvp-small' },
              { name: 'PvP Large (2T/2H/5D/3S/2Catch/1C)', value: 'pvp-large' },
              { name: 'Raid (3T/3H/10D/4S/1C)', value: 'raid' },
              { name: '🎯 Cathedral Of Rat', value: 'cathedral-rat' },
              { name: '🎯 Pure Tracking MLP', value: 'pure-tracking-mlp' },
              { name: '🎯 Faction Capping PvP', value: 'faction-capping' },
              { name: '🎯 5 Man Tracking', value: '5man-tracking' }
            )
        )
        .addIntegerOption(opt =>
          opt
            .setName('max_players')
            .setDescription('Max players (excess goes to bench, optional)')
            .setRequired(false)
            .setMinValue(1)
            .setMaxValue(50)
        )
        .addIntegerOption(opt =>
          opt
            .setName('tank_slots')
            .setDescription('Number of tank slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(10)
        )
        .addIntegerOption(opt =>
          opt
            .setName('healer_slots')
            .setDescription('Number of healer slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(10)
        )
        .addIntegerOption(opt =>
          opt
            .setName('dps_slots')
            .setDescription('Number of DPS slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(20)
        )
        .addIntegerOption(opt =>
          opt
            .setName('support_slots')
            .setDescription('Number of support slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(10)
        )
        .addIntegerOption(opt =>
          opt
            .setName('catcher_slots')
            .setDescription('Number of catcher slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(10)
        )
        .addIntegerOption(opt =>
          opt
            .setName('caller_slots')
            .setDescription('Number of caller slots (overrides template)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(5)
        )
    )

    // /content lock
    .addSubcommand(sub =>
      sub
        .setName('lock')
        .setDescription('Lock the content signup')
    )

    // /content end
    .addSubcommand(sub =>
      sub
        .setName('end')
        .setDescription('End and delete the content signup')
    )
].map(cmd => cmd.toJSON())




/* 2️⃣ Register commands when bot starts */
client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`)

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    await rest.put(
  Routes.applicationGuildCommands(client.user.id, GUILD_ID),
  { body: commands }
)

    console.log('✅ Slash command registered')
  } catch (err) {
    console.error(err)
  }
})

/* 3️⃣ Handle slash command */
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  // /ping
  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong! Bot is working.')
    return
  }

  // /content start
  if (interaction.commandName === 'content') {
    const sub = interaction.options.getSubcommand()
    const voiceChannel = interaction.options.getChannel('voice_channel')


    if (sub === 'lock') {
  const data = store.get(interaction.channelId)

  if (!data) {
    await interaction.reply({ content: '❌ No active content.', ephemeral: true })
    return
  }

  if (interaction.user.id !== data.hostId) {
    await interaction.reply({ content: '❌ Only the host can lock.', ephemeral: true })
    return
  }

  data.locked = true
  await interaction.reply('🔒 Content is now locked.')
  return // 🔴 THIS WAS MISSING
}

if (sub === 'end') {
  const data = store.get(interaction.channelId)

  if (!data) {
    await interaction.reply({ content: '❌ No active content.', ephemeral: true })
    return
  }

  if (interaction.user.id !== data.hostId) {
    await interaction.reply({ content: '❌ Only the host can end the content.', ephemeral: true })
    return
  }

  await interaction.deferReply({ ephemeral: true })

  // Find the bot message in this channel
  const messages = await interaction.channel.messages.fetch({ limit: 20 })
  const botMessage = messages.find(m => m.author.id === interaction.client.user.id)

  // Delete thread if exists
  if (botMessage?.hasThread) {
    await botMessage.thread.delete().catch(() => {})
  }

  // Delete embed message
  if (botMessage) {
    await botMessage.delete().catch(() => {})
  }

  // Remove from store
  store.remove(interaction.channelId)

  await interaction.editReply('✅ Content ended and cleaned up.')
  return
}

    if (sub === 'start') {
      try {
        const title = interaction.options.getString('title')
        const massTimeStr = interaction.options.getString('mass_time')
        const template = interaction.options.getString('template')
        const maxPlayers = interaction.options.getInteger('max_players')

        // Parse UTC time
        const [hour, minute] = massTimeStr.split(':').map(Number)
        const now = new Date()
        const massTime = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        hour,
        minute,
        0
        ))

        await interaction.deferReply()

        // Build role caps from template or custom values
        let caps = {
          tank: 0,
          healer: 0,
          dps: 0,
          support: 0,
          catcher: 0,
          caller: 0,
          bench: Infinity,
          absence: Infinity
        }

        let templateData = null
        let isGameTemplate = false

        // Check if it's a game-specific template
        if (template && GAME_TEMPLATES[template]) {
          isGameTemplate = true
          templateData = GAME_TEMPLATES[template]
          // Use game-specific roles
          Object.assign(caps, templateData.roles)
        } else if (template && TEMPLATES[template]) {
          // Apply standard template if selected
          Object.assign(caps, TEMPLATES[template])
        }

        // Override with custom slot values
        const tankSlots = interaction.options.getInteger('tank_slots')
        const healerSlots = interaction.options.getInteger('healer_slots')
        const dpsSlots = interaction.options.getInteger('dps_slots')
        const supportSlots = interaction.options.getInteger('support_slots')
        const catcherSlots = interaction.options.getInteger('catcher_slots')
        const callerSlots = interaction.options.getInteger('caller_slots')

        if (tankSlots !== null) caps.tank = tankSlots
        if (healerSlots !== null) caps.healer = healerSlots
        if (dpsSlots !== null) caps.dps = dpsSlots
        if (supportSlots !== null) caps.support = supportSlots
        if (catcherSlots !== null) caps.catcher = catcherSlots
        if (callerSlots !== null) caps.caller = callerSlots

        // Initialize roles object with all possible roles
        const allRoles = isGameTemplate 
          ? Object.keys(templateData.roles)
          : ['tank', 'healer', 'dps', 'support', 'catcher', 'caller']

        const rolesObj = {
          bench: [],
          absence: []
        }
        allRoles.forEach(role => {
          rolesObj[role] = []
        })

        const contentData = {
          hostId: interaction.user.id,
          title,
          massTime,
          locked: false,
          orderCounter: 0,
          maxPlayers,
          caps,
          roles: rolesObj,
          voiceChannelId: voiceChannel.id,
          attendance: {
            late: new Set(),
            absent: new Set()
          },
          templateKey: template,
          isGameTemplate
        }

        // Store channelId for proper lookup in timeouts
        const channelId = interaction.channelId
        const guildId = interaction.guildId

        setTimeout(
          () => markLateAtMass(channelId, guildId),
          contentData.massTime.getTime() - Date.now()
        )

        setTimeout(
          () => markAbsentAfterGrace(channelId, guildId),
          contentData.massTime.getTime() - Date.now() + (2 * 60 * 1000)
        )



        store.create(interaction.channelId, contentData)

        const embed = new EmbedBuilder()
          .setTitle(`⚔ ${title}`)
          .setColor(0x8b0000)
          .setDescription(
            `**Host:** <@${interaction.user.id}>\n` +
            `🕒 **Mass Time (UTC):** ${formatDiscordTimestamp(massTime)}\n` +
            `🔊**Voice Channel:** <#${voiceChannel.id}>\n` +
            (maxPlayers ? `👥 **Max Players:** ${maxPlayers}\n` : '') +
            (isGameTemplate && templateData.gearRequirements ? 
              `📋 **Gear Info:** Will be sent via DM on signup\n` : '') +
            `🔒**Manual Lock:** Use \`/content lock\` to lock signups`
          )

        // Dynamically add role fields based on caps
        // Add fields for roles with slots > 0 or unlimited (including bench/absence)
        for (const [role, cap] of Object.entries(contentData.caps)) {
          if (cap > 0 || role === 'bench' || role === 'absence') {
            // Get icon and display name (check game templates first)
            const icon = isGameTemplate && GAME_ROLE_ICONS[role] 
              ? GAME_ROLE_ICONS[role] 
              : (ROLE_ICONS[role] || '❓')
            
            const displayName = isGameTemplate && GAME_ROLE_DISPLAY[role]
              ? GAME_ROLE_DISPLAY[role]
              : (ROLE_DISPLAY_NAMES[role] || role)

            const count = contentData.roles[role] ? contentData.roles[role].length : 0
            const capText = cap === Infinity ? '' : ` (${count}/${cap})`
            
            embed.addFields({
              name: `${icon} ${displayName}${capText}`,
              value: '—'
            })
          }
        }

        const msg = await interaction.editReply({
          embeds: [embed],
          fetchReply: true
        })

        const thread = await msg.startThread({
          name: `${title} Signups`
        })

        // Store thread ID for later use
        contentData.threadId = thread.id
      } catch (err) {
        console.error('❌ Content start error:', err)

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({
            content: '❌ Something went wrong starting the content.'
          })
        }
      }
    }
  }
})
    /* 4️⃣ Handle role signup messages in threads */
       const ROLE_ALIASES = {
  tank: 'tank',

  healer: 'healer',
  heal: 'healer',
  xheal: 'healer',

  dps: 'dps',
  mdps: 'dps',
  rdps: 'dps',
  melee: 'dps',
  range: 'dps',

  support: 'support',
  supp: 'support',

  catcher: 'catcher',
  catch: 'catcher',
  ganker: 'catcher',

  caller: 'caller',
  call: 'caller',

  bench: 'bench',

  absence: 'absence',

  out: 'out',
  cancel: 'out',
  withdraw: 'out',

  // Game-specific role aliases
  dreadstorm: 'dreadstorm',
  hallowfall: 'hallowfall',
  cursed: 'cursed_staff',
  staff: 'cursed_staff',
  daggerbolt: 'dagger_bolt',
  bolt: 'dagger_bolt',
  boltcaster: 'dagger_bolt',
  daggerreaper: 'dagger_reaper',
  reaper: 'dagger_reaper',
  heavymace: 'heavymace',
  mace: 'heavymace',
  truebolt: 'truebolt_oath_root',
  oath: 'truebolt_oath_root',
  oathkeeper: 'truebolt_oath_root',
  root: 'truebolt_oath_root',
  rootbound: 'truebolt_oath_root',
  redemption: 'redemption_blight',
  blight: 'redemption_blight',
  realmbreaker: 'realmbreaker',
  realm: 'realmbreaker',
  carving: 'carving_rotcaller',
  rotcaller: 'carving_rotcaller',
  demonfang: 'demonfang_battlebracer',
  battlebracer: 'demonfang_battlebracer',
  bracer: 'demonfang_battlebracer',
  longbow: 'longbow',
  bow: 'longbow'
}

 client.on('messageCreate', async message => {
  if (!message.channel.isThread()) return
  if (message.author.bot) return

  const parts = message.content.toLowerCase().trim().split(/\s+/)
  if (parts[0] !== 'x') return

  const alias = parts[1]
  const role = ROLE_ALIASES[alias]

  if (!role) {
    await message.reply('❌ Invalid role. Try `x dps`, `x healer`, `x tank`.')
    return
  }

  const parentChannelId = message.channel.parentId
  const data = store.get(parentChannelId)

  if (!data) {
    await message.reply('❌ No active content found for this thread.')
    return
  }

  if (data.locked) {
    await message.reply('🔒 Signups are locked.')
    return
  }

  const userId = message.author.id

  // Check if role exists in this content's roles
  if (!data.roles.hasOwnProperty(role) && role !== 'out') {
    await message.reply(`❌ **${role}** is not available for this content.`)
    return
  }

  // ❌ Absence is system-only
  if (role === 'absence') {
    await message.reply('❌ Absence is handled automatically for late cancellations.')
    return
  } 

  // ⏰ Handle x out / cancel
  if (role === 'out') {
    // Remove user from all roles
    for (const r in data.roles) {
      data.roles[r] = data.roles[r].filter(u => u.userId !== userId)
    }

    await message.react('❌')
    await cleanup(message)
    await refreshEmbed(message, data)
    return
  }

  // Remove user from all roles first
  for (const r in data.roles) {
    data.roles[r] = data.roles[r].filter(u => u.userId !== userId)
  }

  // Check max players (count all non-bench, non-absence)
  if (data.maxPlayers && role !== 'bench') {
    const totalSignups = Object.entries(data.roles)
      .filter(([r]) => r !== 'bench' && r !== 'absence')
      .reduce((sum, [, users]) => sum + users.length, 0)

    if (totalSignups >= data.maxPlayers) {
      // Auto-bench if max reached
      data.orderCounter++
      data.roles.bench.push({
        userId,
        order: data.orderCounter
      })
      await message.react('🪑')
      await message.reply(`⚠️ Max players reached (${data.maxPlayers}). You've been added to **BENCH**.`)
      await cleanup(message)
      await refreshEmbed(message, data)
      return
    }
  }

  // Cap check
  if (data.roles[role].length >= data.caps[role]) {
    await message.reply(`❌ **${role.toUpperCase()}** is full.`)
    return
  }

  data.orderCounter++
  data.roles[role].push({
    userId,
    order: data.orderCounter
  })

  await message.react('✅')
  await sendSignupConfirmation(message, role)
  
  // Send DM with gear requirements if it's a game template
  if (data.isGameTemplate && data.templateKey && GEAR_IMAGES[data.templateKey]) {
    await sendGearRequirementsDM(message.author, data.templateKey, role)
  }
  
  await cleanup(message)
  await refreshEmbed(message, data)

})

client.on('voiceStateUpdate', (oldState, newState) => {
  // Only consider joins/updates with a channel
  if (!newState.channelId) return

  // Ensure we use the member's user ID (safer) when checking attendance
  const memberId = newState.member?.id ?? newState.id

  const data = [...store.values()].find(d => d.voiceChannelId === newState.channelId)

  if (!data) return

  if (newState.channelId === data.voiceChannelId) {
    if (data.attendance.late.has(memberId)) {
      data.attendance.late.delete(memberId)
    }

    if (data.attendance.absent.has(memberId)) return
  }
})


client.login(process.env.TOKEN)

async function updateEmbed(message, data) {
  const embed = EmbedBuilder.from(message.embeds[0])
  embed.setFields([])

  // Show roles that have caps > 0
  for (const [role, cap] of Object.entries(data.caps)) {
    if (cap > 0 || role === 'bench' || role === 'absence') {
      const users = data.roles[role]
        ? data.roles[role]
          .sort((a, b) => a.order - b.order)
          .map(u => `${u.order}. <@${u.userId}>`)
          .join('\n')
        : '—'
      
      const finalUsers = users || '—'

      const count = data.roles[role] ? data.roles[role].length : 0
      
      // Get icon and display name (check game templates first)
      const icon = data.isGameTemplate && GAME_ROLE_ICONS[role] 
        ? GAME_ROLE_ICONS[role] 
        : (ROLE_ICONS[role] || '❓')
      
      const displayName = data.isGameTemplate && GAME_ROLE_DISPLAY[role]
        ? GAME_ROLE_DISPLAY[role]
        : (ROLE_DISPLAY_NAMES[role] || role)

      const capText = cap === Infinity ? '' : ` (${count}/${cap})`

      embed.addFields({
        name: `${icon} ${displayName}${capText}`,
        value: finalUsers,
        inline: false
      })
    }
  }

  await message.edit({ embeds: [embed] })
}

async function cleanup(message) {
  setTimeout(() => {
    message.delete().catch(() => {})
  }, 1500)
}

async function refreshEmbed(message, data) {
  const parentMessage = await message.channel.parent.messages.fetch({ limit: 10 })
    .then(msgs => msgs.find(m => m.author.id === message.client.user.id))

  if (parentMessage) {
    await updateEmbed(parentMessage, data)
  }
}

async function sendSignupConfirmation(message, role) {
  const embed = new EmbedBuilder()
    .setColor(0x2ecc71) // green
    .setTitle('SIGN UP SUCCESSFUL ✅')
    .setDescription(
      `**USER:** ${message.author}\n` +
      `**ROLE:** ${role.toUpperCase()}`
    )
    .setFooter({ text: 'Powered by sinner-bot ⚡' })
    .setTimestamp()

  const reply = await message.reply({ embeds: [embed] })
}

function formatDiscordTimestamp(date) {
  const unix = Math.floor(date.getTime() / 1000)
  return `<t:${unix}:t> (<t:${unix}:R>)`
}

async function sendGearRequirementsDM(user, templateKey, role) {
  try {
    const gearInfo = GEAR_IMAGES[templateKey]
    const template = GAME_TEMPLATES[templateKey]
    
    if (!gearInfo) return

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`📋 Gear Requirements: ${template.name}`)
      .setDescription(
        `**Your Role:** ${GAME_ROLE_DISPLAY[role] || role}\n\n` +
        gearInfo.description
      )
      .setFooter({ text: 'Sinner Bot • Good luck!' })
      .setTimestamp()

    // If there's an image URL, add it
    if (gearInfo.imageUrl) {
      embed.setImage(gearInfo.imageUrl)
    }

    await user.send({ embeds: [embed] })
  } catch (err) {
    console.error('Failed to send DM:', err)
    // Silently fail if user has DMs disabled
  }
}

async function markLateAtMass(channelId, guildId) {
  const data = store.get(channelId)
  if (!data) return

  const guild = client.guilds.cache.get(guildId)
  if (!guild) return

  const vc = guild.channels.cache.get(data.voiceChannelId)
  if (!vc || !vc.isVoiceBased()) return

  const present = new Set(vc.members.map(m => m.id))

  // Skip checking absence and bench roles
  const excludeRoles = ['bench', 'absence']
  
  // Check all roles except excluded ones
  for (const [role, users] of Object.entries(data.roles)) {
    if (excludeRoles.includes(role)) continue
    if (!users || !Array.isArray(users)) continue
    
    for (const user of users) {
      if (!present.has(user.userId)) {
        data.attendance.late.add(user.userId)
      }
    }
  }

  // Post to thread instead of parent channel
  const thread = guild.channels.cache.get(data.threadId)
  if (thread) {
    await thread.send(`⏰ **Mass started. Late check complete.**`)
  }
}

async function markAbsentAfterGrace(channelId, guildId) {
  const data = store.get(channelId)
  if (!data) return

  const guild = client.guilds.cache.get(guildId)
  if (!guild) return

  const vc = guild.channels.cache.get(data.voiceChannelId)
  if (!vc || !vc.isVoiceBased()) return

  const present = new Set(vc.members.map(m => m.id))

  data.attendance.late.forEach(userId => {
    if (!present.has(userId)) {
      // Mark absent (FINAL)
      data.attendance.absent.add(userId)

      // Remove from their current role
      for (const role of Object.keys(data.roles)) {
        data.roles[role] = data.roles[role].filter(u => u.userId !== userId)
      }

      // Add to absence
      data.roles.absence.push({
        userId,
        order: ++data.orderCounter
      })
    }
  })

  // Absence is FINAL — no recovery
  data.attendance.late.clear()

  try {
    const channel = guild.channels.cache.get(channelId)
    if (!channel) return

    const messages = await channel.messages.fetch({ limit: 10 })
    const botMessage = messages.find(m => m.author.id === client.user.id)

    if (botMessage) {
      await updateEmbed(botMessage, data)
    }

    // Post to thread instead of replying to embed
    const thread = guild.channels.cache.get(data.threadId)
    if (thread) {
      await thread.send('🚫 **Grace period ended — absences finalized.**')
    }
  } catch (err) {
    console.error('Final absence error:', err)
  }
}

