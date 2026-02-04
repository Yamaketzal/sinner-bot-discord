require('dotenv').config()
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')

const store = require('./store')


const client = new Client({
  intents: [GatewayIntentBits.Guilds]
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
    )
].map(cmd => cmd.toJSON())


/* 2️⃣ Register commands when bot starts */
client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`)

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
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

if (interaction.commandName === 'content') {
  const sub = interaction.options.getSubcommand()

  if (sub === 'start') {
    try {
      const title = interaction.options.getString('title')

      await interaction.deferReply()

      const contentData = {
        hostId: interaction.user.id,
        title,
        roles: {
          tank: [],
          healer: [],
          dps: [],
          caller: [interaction.user.id],
          bench: [],
          absence: []
        }
      }

      store.create(interaction.channelId, contentData)

      const embed = new EmbedBuilder()
        .setTitle(`⚔ ${title}`)
        .setDescription(`Host: <@${interaction.user.id}>`)
        .setColor(0x8b0000)
        .addFields(
          { name: '🛡 Tank (0/1)', value: '—' },
          { name: '💉 Healer (0/1)', value: '—' },
          { name: '⚔ DPS (0/4)', value: '—' },
          { name: '📣 Caller (1/1)', value: `<@${interaction.user.id}>` },
          { name: '🪑 Bench', value: '—' },
          { name: '🚫 Absence', value: '—' }
        )

      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('signup_tank')
          .setLabel('Tank')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('signup_healer')
          .setLabel('Healer')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('signup_dps')
          .setLabel('DPS')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('signup_caller')
          .setLabel('Caller')
          .setStyle(ButtonStyle.Secondary)
      )

      const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('signup_bench')
          .setLabel('Bench')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('signup_absence')
          .setLabel('Absence')
          .setStyle(ButtonStyle.Secondary)
      )

      const msg = await interaction.editReply({
        embeds: [embed],
        components: [row1, row2],
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

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong! Bot is working.')
  }
})

client.login(process.env.TOKEN)
