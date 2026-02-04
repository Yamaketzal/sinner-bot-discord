const contents = new Map()

module.exports = {
  create(channelId, data) {
    contents.set(channelId, data)
  },

  get(channelId) {
    return contents.get(channelId)
  },

  remove(channelId) {
    contents.delete(channelId)
  }
}
