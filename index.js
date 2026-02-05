require('dotenv').config()
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js')

const store = require('./store')
const GUILD_ID = '1360620690323148800'

/* =========================
   CLIENT
========================= */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})

/* =========================
   COMMAND DEFINITIONS
========================= */

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Test'),

  new SlashCommandBuilder()
    .setName('content')
    .setDescription('Content commands')
    .addSubcommand(s =>
      s.setName('start')
        .setDescription('Start content')
        .addStringOption(o =>
          o.setName('title').setRequired(true)
        )
        .addStringOption(o =>
          o.setName('mass_time').setDescription('UTC HH:MM').setRequired(true)
        )
        .addChannelOption(o =>
          o.setName('voice_channel').setRequired(true)
        )
    )
    .addSubcommand(s =>
      s.setName('lock').setDescription('Lock signup')
    )
    .addSubcommand(s =>
      s.setName('end').setDescription('End content')
    )
].map(c => c.toJSON())

/* =========================
   READY
========================= */

client.once('ready', async () => {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
  await rest.put(
    Routes.applicationGuildCommands(client.user.id, GUILD_ID),
    { body: commands }
  )
  console.log(`🤖 Logged in as ${client.user.tag}`)
})

/* =========================
   INTERACTIONS
========================= */

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong')
    return
  }

  if (interaction.commandName !== 'content') return

  const sub = interaction.options.getSubcommand()

  /* ===== START ===== */
  if (sub === 'start') {
    await interaction.deferReply()

    const title = interaction.options.getString('title')
    const [h, m] = interaction.options.getString('mass_time').split(':').map(Number)
    const vc = interaction.options.getChannel('voice_channel')

    const now = new Date()
    const massTime = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      h, m, 0
    ))

    const data = {
      hostId: interaction.user.id,
      title,
      massTime,
      voiceChannelId: vc.id,
      locked: false,
      orderCounter: 1,
      attendance: {
        late: new Set(),
        absent: new Set()
      },
      caps: {
        tank: 1,
        healer: 1,
        dps: 4,
        caller: 1,
        bench: Infinity
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

    store.create(interaction.channelId, data)

    scheduleAutoLock(interaction.channel, data)
    scheduleLateCheck(interaction.channel, data)
    scheduleAbsenceFinalize(interaction.channel, data)

    const embed = buildEmbed(data)
    const msg = await interaction.editReply({ embeds: [embed], fetchReply: true })
    await msg.startThread({ name: `${title} Signups` })
    return
  }

  /* ===== LOCK ===== */
  if (sub === 'lock') {
    const data = store.get(interaction.channelId)
    if (!data) return interaction.reply({ content: '❌ No content', ephemeral: true })
    if (interaction.user.id !== data.hostId)
      return interaction.reply({ content: '❌ Host only', ephemeral: true })

    data.locked = true
    await interaction.reply('🔒 Locked')
    return
  }

  /* ===== END ===== */
  if (sub === 'end') {
    const data = store.get(interaction.channelId)
    if (!data) return interaction.reply({ content: '❌ No content', ephemeral: true })

    const msgs = await interaction.channel.messages.fetch({ limit: 10 })
    const botMsg = msgs.find(m => m.author.id === client.user.id)

    if (botMsg?.hasThread) await botMsg.thread.delete().catch(() => {})
    if (botMsg) await botMsg.delete().catch(() => {})

    store.remove(interaction.channelId)
    await interaction.reply({ content: '✅ Content ended', ephemeral: true })
  }
})

/* =========================
   SIGNUP HANDLER
========================= */

const ROLE_ALIASES = {
  tank: 'tank',
  healer: 'healer',
  heal: 'healer',
  dps: 'dps',
  mdps: 'dps',
  caller: 'caller',
  bench: 'bench',
  out: 'out'
}

client.on('messageCreate', async msg => {
  if (!msg.channel.isThread() || msg.author.bot) return

  const [x, raw] = msg.content.toLowerCase().split(' ')
  if (x !== 'x') return

  const role = ROLE_ALIASES[raw]
  if (!role) return

  const data = store.get(msg.channel.parentId)
  if (!data || data.locked) return

  const uid = msg.author.id

  Object.keys(data.roles).forEach(r =>
    data.roles[r] = data.roles[r].filter(u => u.userId !== uid)
  )

  if (role === 'out') {
    data.roles.absence.push({ userId: uid, order: ++data.orderCounter })
  } else {
    if (data.roles[role].length >= data.caps[role]) return
    data.roles[role].push({ userId: uid, order: ++data.orderCounter })
  }

  await msg.react('✅')
  await refreshEmbed(msg, data)
  setTimeout(() => msg.delete().catch(() => {}), 1500)
})

/* =========================
   VOICE ATTENDANCE
========================= */

client.on('voiceStateUpdate', (_, newState) => {
  const data = [...store.values()]
    .find(d => d.voiceChannelId === newState.channelId)

  if (!data) return

  data.attendance.late.delete(newState.id)
})

/* =========================
   SCHEDULERS
========================= */

function scheduleAutoLock(channel, data) {
  setTimeout(() => data.locked = true,
    data.massTime.getTime() - Date.now() - 20 * 60 * 1000)
}

function scheduleLateCheck(channel, data) {
  setTimeout(() => markLate(channel, data),
    data.massTime.getTime() - Date.now())
}

function scheduleAbsenceFinalize(channel, data) {
  setTimeout(() => finalizeAbsence(channel, data),
    data.massTime.getTime() - Date.now() + 10 * 60 * 1000)
}

/* =========================
   ATTENDANCE
========================= */

function markLate(channel, data) {
  const vc = channel.guild.channels.cache.get(data.voiceChannelId)
  if (!vc) return

  const present = new Set(vc.members.map(m => m.id))

  Object.values(data.roles).flat().forEach(u => {
    if (!present.has(u.userId)) data.attendance.late.add(u.userId)
  })
}

function finalizeAbsence(channel, data) {
  data.attendance.late.forEach(id =>
    data.roles.absence.push({ userId: id, order: ++data.orderCounter })
  )
  data.attendance.late.clear()
}

/* =========================
   EMBEDS
========================= */

function buildEmbed(data) {
  const e = new EmbedBuilder()
    .setTitle(`⚔ ${data.title}`)
    .setDescription(`Host: <@${data.hostId}>`)
    .setColor(0x8b0000)

  for (const r in data.roles) {
    const list = data.roles[r].map(u => `<@${u.userId}>`).join('\n') || '—'
    e.addFields({ name: r.toUpperCase(), value: list })
  }
  return e
}

async function refreshEmbed(msg, data) {
  const parent = await msg.channel.parent.messages.fetch({ limit: 5 })
    .then(m => m.find(x => x.author.id === client.user.id))
  if (parent) parent.edit({ embeds: [buildEmbed(data)] })
}

client.login(process.env.TOKEN)
