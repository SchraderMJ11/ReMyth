#!/usr/bin/env node

var forever = require('forever-monitor');

var argv = require('optimist')
    .default('port', 8088)
    .argv;

console.log('-----PORT: ' + argv.port);

var dir = __dirname;

var child = new (forever.Monitor)(dir + '/server.js', {
	options: ['--port', argv.port]
});

child.on('exit', function () {
	console.log('server.js has exited, and will not restart, due to default max!');
});

child.start();
