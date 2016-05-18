//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Main Server File
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
'use strict';

const Hapi = require('hapi');
const inert = require('inert');
const server = new Hapi.Server();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// local app modules 
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const routes = require('./routes');
const utils = require('./utils');

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Server Connection routes and startup
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// listening on port 3000
server.connection({ port: 3000 });
// pull in inert which allows server to display staic content
server.register([inert], (err) => {
	if (err){ throw err; }
	// all routes that get provide from routes line 12
	server.route([
			routes.public,
			routes.bower,
			routes.getProducts,
			routes.getProductOpts
		])
	//  start the server
	server.start((err) => {

    if (err) { throw err; }
    console.log('Server running at:', server.info.uri);
});
})