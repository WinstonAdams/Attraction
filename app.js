//* 載入外部的套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const http = require('http')
const { Server } = require('socket.io')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//* 載入自己設定的檔案
const routes = require('./routes')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

const app = express()
const PORT = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET
const server = http.createServer(app)
const io = new Server(server)

// 將 io(實例) 附加到 app(物件) 上，讓之後的 middleware 都可以使用
app.io = io

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: handlebarsHelpers
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // body-parser，承接並解析 urlencoded 格式的請求
app.use(methodOverride('_method'))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.warning_messages = req.flash('warning_messages')
  res.locals.user = req.user
  next()
})

app.use(routes)

server.listen(PORT, () => {
  console.log(`📢 App is listening on http://localhost:${PORT}`)
})
