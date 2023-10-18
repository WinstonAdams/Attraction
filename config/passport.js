const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

const { User, Attraction } = require('../models')

// 本地登入驗證
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

      const isMatch = bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Attraction, as: 'FavoriteAttractions' }]
    })
    return done(null, user.toJSON())
  } catch (err) {
    return done(err)
  }
})

module.exports = passport
