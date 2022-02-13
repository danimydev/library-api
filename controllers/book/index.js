const { bookFactory } = require('../../entities/book');

const BOOKS = [];

function getBook(httpRequest) {
  return {
    statusCode: 200,
    body: {
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

function postBook(httpRequest) {
  return {
    statusCode: 201,
    body: {
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

module.exports = {
  getBook,
  postBook,
}