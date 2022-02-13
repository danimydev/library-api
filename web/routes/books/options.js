const BookType = {
  id: { type: 'string' },
  title: { type: 'string' },
  author: { type: 'string' },
  isbn: { type: 'string' },
}

const getBookOpts = {
  schema: {
    response: {
      200: {
        type: BookType,
      },
    },
  },
}

const postBookOpts = {
  schema: {
    response: {
      201: {
        type: BookType,
      },
    },
  },
}

module.exports = {
  getBookOpts,
  postBookOpts,
}