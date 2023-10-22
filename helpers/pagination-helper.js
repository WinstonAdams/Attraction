module.exports = {
  getOffset: (limit, page) => {
    return limit * (page - 1)
  },

  getPagination: (limit, page, total) => {
    const totalPage = Math.ceil(total / limit)
    const pages = Array.from({ length: totalPage }, (_, index) => index + 1)
    const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
    const nearPages = pages.filter(page => {
      return page >= currentPage - 3 && page <= currentPage + 3
    })
    const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
    const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1
    return {
      totalPage,
      pages,
      currentPage,
      nearPages,
      prev,
      next
    }
  }

}
