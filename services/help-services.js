const { User, Message } = require('../models')

const helpServices = {
  getUsers: async (req, callback) => {
    try {
      const users = await User.findAll({
        where: { isAdmin: false },
        attributes: ['id', 'name'],
        raw: true
      })
      return callback(null, users)
    } catch (err) {
      return callback(err)
    }
  },

  getHelp: async (req, callback) => {
    try {
      const io = req.app.io
      const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Taipei' }
      const roomId = `${req.params.userId}-admin`

      // 一次性的監聽 connection 事件
      io.once('connection', socket => {
        // 給一個特定的 room channel
        socket.join(roomId)
        // 斷線時
        socket.on('disconnect', () => {
          io.to(roomId).emit('message', { name: req.user.name, content: '(已離線)', createdAt: new Date().toLocaleString('en-US', options) })
        })
        // 收到前端使用者輸入的 content 時
        socket.on('content', async (content) => {
          // 存入資料庫
          let newMsg = await Message.create({
            roomId,
            content,
            userId: req.user.id
          })
          newMsg = newMsg.toJSON()
          newMsg.createdAt = newMsg.createdAt.toLocaleString('en-US', options)
          newMsg.name = req.user.name
          // 將 message 傳給前端，即時顯示 message
          io.to(roomId).emit('message', newMsg)
        })
      })

      // 從資料庫撈取過去的 message 紀錄
      let messages = await Message.findAll({
        where: { roomId },
        include: { model: User, attributes: ['name'] },
        raw: true,
        nest: true
      })
      messages = messages.map(msg => {
        return {
          ...msg,
          createdAt: msg.createdAt.toLocaleString('en-US', options)
        }
      })
      return callback(null, messages)
    } catch (err) {
      return callback(err)
    }
  }
}

module.exports = helpServices
