const helpServices = require('../services/help-services')

const helpController = {
  getHelp: (req, res, next) => {
    try {
      if (req.user.isAdmin && req.user.id === Number(req.params.userId)) {
        return helpServices.getUsers(req, (err, data) => err ? next(err) : res.render('admin-help', { users: data }))
      }
      if (req.user.isAdmin || req.user.id === Number(req.params.userId)) {
        return res.render('help')
      }

      throw new Error('只能進入自己的客服聊天室！')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = helpController
