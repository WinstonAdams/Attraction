const helpController = {
  getHelp: (req, res) => {
    if (req.user.isAdmin) {
      return res.send('admin')
    }
    res.render('help')
  }
}

module.exports = helpController
