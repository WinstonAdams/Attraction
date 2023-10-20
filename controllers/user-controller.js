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
  }
}

module.exports = userController
