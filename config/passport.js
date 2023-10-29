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

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

// Facebook 登入驗證
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] // 向 Facebook 要求開放的資料 (email 和 Facebook 上的公開名稱)
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // profile 裡面有一個 _json 物件，包含 name 和 email
      const { name, email } = profile._json

      const user = await User.findOne({ where: { email } })
      // 直接登入
      if (user) return done(null, user)

      // 寫入資料後登入
      const randomPassword = Math.random().toString(36).slice(-8)
      const newUser = User.create({
        name,
        email,
        password: await bcrypt.hash(randomPassword, 10)
      })
      return done(null, newUser)
    } catch (err) {
      done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Attraction, as: 'FavoriteAttractions' }]
    })
    user = user.toJSON()
    return done(null, user)
  } catch (err) {
    return done(err)
  }
})

module.exports = passport
