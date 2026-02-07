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
  },

  // Expose the values iterator so callers can iterate over stored content data
  values() {
    return contents.values()
  }
}
