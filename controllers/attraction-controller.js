const attractionServices = require('../services/attraction-services')

const attractionController = {
  getAttractions: (req, res, next) => {
    attractionServices.getAttractions(req, (err, data) => err ? next(err) : res.render('attractions', data))
  }
}

module.exports = attractionController
