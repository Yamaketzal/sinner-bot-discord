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

const GUILD_ID = '1360620690323148800'


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
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

        const contentData = {
          hostId: interaction.user.id,
          title,
          massTime,
          locked: false,
          orderCounter: 1,
          caps: {
            tank: 1,
            healer: 1,
            dps: 4,
            caller: 1,
            bench: Infinity,
            absence: Infinity
          },
          roles: {
            tank: [],
            healer: [],
            dps: [],
            caller: [{ userId: interaction.user.id, order: 1 }],
            bench: [],
            absence: []
          },
          voiceChannelId: voiceChannel.id,
          attendance: {
            late: new Set(),
            absent: new Set()
          }


    
        }

        setTimeout(
          () => markLateAtMass(interaction.channel, contentData),
          contentData.massTime.getTime() - Date.now()
        )

        setTimeout(
          () => markAbsentAfterGrace(interaction.channel, contentData),
          contentData.massTime.getTime() - Date.now() + (10 * 60 * 1000)
        )



        store.create(interaction.channelId, contentData)

            const embed = new EmbedBuilder()
            .setTitle(`⚔ ${title}`)
            .setColor(0x8b0000)
            .setDescription(
                `**Host:** <@${interaction.user.id}>\n` +
                `🕒 **Mass Time (UTC):** ${formatDiscordTimestamp(massTime)}\n` +
                `🔒 **Manual Lock:** Use \`/content lock\` to lock signups`
            )

          .addFields(
            { name: '🛡 Tank (0/1)', value: '—' },
            { name: '💉 Healer (0/1)', value: '—' },
            { name: '⚔ DPS (0/4)', value: '—' },
            { name: '📣 Caller (1/1)', value: `<@${interaction.user.id}>` },
            { name: '🪑 Bench', value: '—' },
            { name: '🚫 Absence', value: '—' }
          )

        const msg = await interaction.editReply({
          embeds: [embed],
          fetchReply: true
        })

        await msg.startThread({
          name: `${title} Signups`
        })
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

  caller: 'caller',
  call: 'caller',

  bench: 'bench',

  absence: 'absence',

  out: 'out',
  cancel: 'out',
  withdraw: 'out'
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
  await cleanup(message)
  await refreshEmbed(message, data)

})

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!newState.channelId) return

  const data = [...store.values()]
  .find(d => d.voiceChannelId === newState.channelId)

  if (!data) return

  if (newState.channelId === data.voiceChannelId) {
    if (data.attendance.late.has(newState.id)) {
      data.attendance.late.delete(newState.id)
    }

  if (data.attendance.absent.has(newState.id)) return

  }
})


client.login(process.env.TOKEN)

async function updateEmbed(message, data) {
  const embed = EmbedBuilder.from(message.embeds[0])
  embed.setFields([])

  const roleNames = {
    tank: '🛡 Tank',
    healer: '💉 Healer',
    dps: '⚔ DPS',
    caller: '📣 Caller',
    bench: '🪑 Bench',
    absence: '🚫 Absence'
  }

  for (const role of Object.keys(data.roles)) {
    const users = data.roles[role]
      .sort((a, b) => a.order - b.order)
      .map(u => `${u.order}. <@${u.userId}>`)
      .join('\n') || '—'

    const cap = data.caps[role]
    const count = data.roles[role].length
    const capText = cap === Infinity ? '' : ` (${count}/${cap})`

    embed.addFields({
      name: `${roleNames[role]}${capText}`,
      value: users,
      inline: false
    })
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

async function markLateAtMass(channel, data) {
  const vc = channel.guild.channels.cache.get(data.voiceChannelId)
  if (!vc || !vc.isVoiceBased()) return

  const present = new Set(vc.members.map(m => m.id))

  for (const role of Object.keys(data.roles)) {
    for (const user of data.roles[role]) {
      if (!present.has(user.userId)) {
        data.attendance.late.add(user.userId)
      }
    }
  }

  channel.send(`⏰ **Mass started. Late check complete.**`)
}

async function markAbsentAfterGrace(channel, data) {
  const vc = channel.guild.channels.cache.get(data.voiceChannelId)
  if (!vc || !vc.isVoiceBased()) return

  const present = new Set(vc.members.map(m => m.id))

  data.attendance.late.forEach(userId => {
    if (!present.has(userId)) {
      // Mark absent (FINAL)
      data.attendance.absent.add(userId)

      data.roles.absence.push({
        userId,
        order: ++data.orderCounter
      })
    }
  })

  // Absence is FINAL — no recovery
  data.attendance.late.clear()

  try {
    const messages = await channel.messages.fetch({ limit: 10 })
    const botMessage = messages.find(m => m.author.id === channel.client.user.id)

    if (botMessage) {
      await updateEmbed(botMessage, data)
      await botMessage.reply('🚫 **Grace period ended — absences finalized.**')
    }
  } catch (err) {
    console.error('Final absence error:', err)
  }
}

