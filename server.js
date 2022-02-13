class Server {
	constructor({ httpStrategy }) {
		this.httpStrategy = httpStrategy;
	}
	start({ port }) {
		this.httpStrategy.start({ port });
	}
}

module.exports = {
	Server,
}