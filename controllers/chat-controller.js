const OpenAIApi = require('openai')
const Configuration = require('openai')

const configuration = new Configuration({
  organization: 'org-VaB9UiVOnTAeNLiANMGjek3y',
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const chatController = {
  getChat: (req, res) => {
    res.render('chat')
  },

  postChat: async (req, res, next) => {
    try {
      const { question } = req.body
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `${question}` }],
        model: 'gpt-3.5-turbo'
      })
      const answer = completion.choices[0].message.content

      return res.render('chat', { question, answer })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = chatController
