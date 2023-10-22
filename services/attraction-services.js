const { Op } = require('sequelize')
const { Attraction } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const attractionServices = {
  getAttractions: async (req, callback) => {
    try {
      const DEFAULT_LIMIT = 12
      const { city, keyword } = req.query
      const page = Number(req.query.page) || 1
      const offset = getOffset(DEFAULT_LIMIT, page)

      const attractions = await Attraction.findAndCountAll({
        where: {
          ...(city ? { city } : {}),
          name: {
            [Op.substring]: keyword ? keyword.trim() : ''
          }
        },
        limit: DEFAULT_LIMIT,
        offset,
        nest: true,
        raw: true
      })
      const result = attractions.rows

      return callback(null, {
        attractions: result,
        keyword,
        city,
        pagination: getPagination(DEFAULT_LIMIT, page, attractions.count),
        haveEllipsisFront: page > 4,
        haveEllipsisBack: page < getPagination(DEFAULT_LIMIT, page, attractions.count).pages.length - 3
      })
    } catch (err) {
      return callback(err)
    }
  }
}

module.exports = attractionServices
