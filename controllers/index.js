function getIndex(httpRequest) {
  return {
    statusCode: 200,
    body: {
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

function postIndex(httpRequest) {
  return {
    statusCode: 201,
    body: {
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

module.exports = {
  getIndex,
  postIndex,
}