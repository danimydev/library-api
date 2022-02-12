const fastify = require('fastify');
const autoLoad = require('fastify-autoload');
const { dirname, join } = require('path');

const { HttpStrategy } = require('./http_strategy');

class FastifyStrategy extends HttpStrategy{

	constructor({ library = fastify, options = { logger: true }}){
		super({ library });
		this.server = this.server(options);
		this.loadRoutes();
	}

	start({ port }){
		this.server.listen(port, function (err, address) {
		  if (err) {
		    this.server.log.error(err);
		    process.exit(1);
		  }
		});
	}

	loadRoutes(){
		this.server.register(autoLoad, {
			dir: join(__dirname, 'routes'),
		});
	}

}

module.exports = {
    FastifyStrategy,
}