const bcrypt = require('bcryptjs')
const validator = require('validator')

const { User, Attraction, Favorite } = require('../models')

const userServices = {
  signUp: async (req, callback) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name || !email || !password || !passwordCheck) throw new Error('所有欄位皆為必填！')
      if (!validator.isEmail(email)) throw new Error('請輸入正確 email!')
      if (password !== passwordCheck) throw new Error('密碼與確認密碼不符合！')

      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('email 已註冊過！')

      const newUser = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      })
      return callback(null, newUser)
    } catch (err) {
      return callback(err)
    }
  },

  addFavorite: async (req, callback) => {
    try {
      const { attractionId } = req.params

      const [attraction, favorite] = await Promise.all([
        Attraction.findByPk(attractionId),
        Favorite.findOne({ where: { userId: req.user.id, attractionId } })
      ])
      if (!attraction) throw new Error('此景點不存在!')
      if (favorite) throw new Error('此景點已加入願望清單!')

      const newFavorite = await Favorite.create({ userId: req.user.id, attractionId })
      return callback(null, newFavorite)
    } catch (err) {
      return callback(err)
    }
  }
}

module.exports = userServices
