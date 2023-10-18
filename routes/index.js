const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

// 向 Facebook 發出請求，要求 email 和 Facebook 上的公開資料
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
// Facebook 把資料發回來，導向此路由
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

router.use('/', (req, res) => res.redirect('/attractions'))

router.use('/', generalErrorHandler)

module.exports = router
