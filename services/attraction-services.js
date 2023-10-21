const { Op } = require('sequelize')
const { User, Attraction } = require('../models')

const attractionServices = {
  getAttractions: async (req, callback) => {
    try {
      const city = req.query.city
      const keyword = req.query.keyword
      const limit = 12

      const attractions = await Attraction.findAll({
        where: {
          ...(city ? { city } : {}),
          name: {
            [Op.substring]: keyword ? keyword.trim() : ''
          }
        },
        limit,
        nest: true,
        raw: true
      })
      console.log("🚀 attractions:", attractions)

      callback(null, { attractions, keyword, city })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = attractionServices
