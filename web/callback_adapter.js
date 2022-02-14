function makeFastifyCallback(controller) {
  return async (request, reply) => {
    try {
      const httpRequest = buildHttpRequest(request);
      const httpResponse = await executeAndGetHttpResponse(controller, httpRequest);
      sendHttpResponse(reply, httpResponse);
    } catch (error) {
      throw error;
    }

  }
}

function buildHttpRequest(request) {
  return {
    body: request.body,
    query: request.query,
    params: request.params,
    ip: request.ip,
    method: request.method,
    path: request.url,
  }
}

async function executeAndGetHttpResponse(controller, httpRequest) {
  try {
    const response = await controller(httpRequest);
    return response;
  } catch (error) {
    throw error;
  }
}

function sendHttpResponse(reply, httpResponse) {
  try {
    reply.headers = httpResponse.headers || {};
    reply.type('json');
    reply.code(httpResponse.statusCode).send(httpResponse.body);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  makeFastifyCallback,
}