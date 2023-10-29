const askServices = require('../services/ask-services')

const askController = {
  getAsk: (req, res) => {
    res.render('ask')
  },

  postAsk: (req, res, next) => {
    askServices.postAsk(req, (err, data) => err ? next(err) : res.render('ask', data))
  }
}

module.exports = askController
