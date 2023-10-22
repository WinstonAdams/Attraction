const userServices = require('../services/user-services')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },

  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) next(err)

      req.flash('success_messages', '成功註冊帳號！')
      return res.redirect('/signin')
    })
  },

  signInPage: (req, res) => {
    res.render('signin')
  },

  signIn: (req, res) => {
    return res.redirect('/attractions')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },

  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },

  getFavorites: (req, res, next) => {
    try {
      const favoritedAttraction = req.user.FavoriteAttractions
      return res.render('favorites', { attractions: favoritedAttraction })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = userController
