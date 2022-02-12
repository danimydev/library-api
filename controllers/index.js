function getIndex(httpRequest) {
    return {
        statusCode: 200,
        body: {
            method: httpRequest.method,
            path: httpRequest.path,
        }
    }
}

module.exports = {
    getIndex,
}