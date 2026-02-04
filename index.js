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
    )
    .addSubcommand(sub =>
      sub
        .setName('lock')
        .setDescription('Lock the content signup')
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
          }
          
        }

        store.create(interaction.channelId, contentData)

        const lockTime = new Date(massTime.getTime() - 20 * 60 * 1000)

            const embed = new EmbedBuilder()
            .setTitle(`⚔ ${title}`)
            .setColor(0x8b0000)
            .setDescription(
                `**Host:** <@${interaction.user.id}>\n` +
                `🕒 **Mass Time (UTC):** ${formatDiscordTimestamp(massTime)}\n` +
                `🔒 **Signup Locks:** ${formatDiscordTimestamp(lockTime)}`
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
  if (!role) {
  await message.reply('❌ Invalid role. Try `x dps`, `x healer`, `x tank`.')
  return
}


  const parts = message.content.toLowerCase().trim().split(/\s+/)
  if (parts[0] !== 'x') return

  const alias = parts[1]
  const role = ROLE_ALIASES[alias]
  if (!role) return

  const parentChannelId = message.channel.parentId
  const data = store.get(parentChannelId)
  if (!data || data.locked) return

  const userId = message.author.id
  const now = new Date()
  const lockTime = new Date(data.massTime.getTime() - 20 * 60 * 1000)

  // ❌ Absence is system-only
  if (role === 'absence') {
    await message.reply('❌ Absence is handled automatically for late cancellations.')
    return
  }

  // ⏰ Handle x out / cancel
  if (role === 'out') {
    if (now > lockTime) {
      // Late cancel → Absence
      for (const r in data.roles) {
        data.roles[r] = data.roles[r].filter(u => u.userId !== userId)
      }

      data.orderCounter++
      data.roles.absence.push({
        userId,
        order: data.orderCounter
      })

      await message.react('⚠️')
    } else {
      // Early cancel → remove completely
      for (const r in data.roles) {
        data.roles[r] = data.roles[r].filter(u => u.userId !== userId)
      }
      await message.react('❌')
    }

    await cleanup(message)
    await refreshEmbed(message, data)
    return
  }

  // 🔒 Role signup locked by time
  if (now > lockTime) {
    await message.reply('🔒 Signups are locked (20 minutes before mass).')
    return
  }

  // Remove user from all roles
  for (const r in data.roles) {
    data.roles[r] = data.roles[r].filter(u => u.userId !== userId)
  }

  // Cap check
  if (data.roles[role].length >= data.caps[role]) {
    await message.reply(`❌ **${role.toUpperCase()}** is full.`)
    return
  }
if (!data) {
  await message.reply('❌ No active content found for this thread.')
  return
}

  data.orderCounter++
  data.roles[role].push({
    userId,
    order: data.orderCounter
  })

  await message.react('✅')
  await cleanup(message)
  await refreshEmbed(message, data)
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

function formatDiscordTimestamp(date) {
  const unix = Math.floor(date.getTime() / 1000)
  return `<t:${unix}:t> (<t:${unix}:R>)`
}
