module.exports = {
  generalErrorHandler: (err, req, res, next) => {
    // err 若是一個實例(物件)，有屬性 name 和 message； 若否，err 可能是字串
    if (err instanceof Error) {
      req.flash('error_messages', `${err.name}: ${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }

    res.redirect('back')
    next(err)
  }
}
