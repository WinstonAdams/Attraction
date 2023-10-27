const { User, Message } = require('../models')

const helpServices = {
  getUsers: async (req, callback) => {
    try {
      const users = await User.findAll({
        where: { isAdmin: false },
        attributes: ['id', 'name'],
        raw: true
      })
      return callback(null, users)
    } catch (err) {
      return callback(err)
    }
  }
}

module.exports = helpServices
