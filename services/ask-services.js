const OpenAIApi = require('openai')
const Configuration = require('openai')

const configuration = new Configuration({
  organization: 'org-VaB9UiVOnTAeNLiANMGjek3y',
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const askServices = {
  postAsk: async (req, callback) => {
    try {
      const { question } = req.body
      const gptLastAnswer = req.flash('gptAnswer')
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: `${gptLastAnswer}，以上是你之前的回覆，你是一位旅遊專家，請根據我的問題或敘述給予客觀的回答` },
          { role: 'user', content: `${question}，若上述問題或敘述與台灣旅遊或景點不相關，請直接回覆「請輸入台灣旅遊相關的問題」` }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 1000
      })
      const answer = completion.choices[0].message.content
      req.flash('gptAnswer', answer)

      return callback(null, { question, answer })
    } catch (err) {
      return callback(err)
    }
  }
}

module.exports = askServices
