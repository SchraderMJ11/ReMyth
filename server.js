var argv = require('optimist')
    .default('port', 8088)
    .argv;

var port = argv.port;

var ReMyth = require('./ReMyth.js');

// Load a built-in node library
var HTTP = require('http');
// Load a couple third-party node modules
var Stack = require('stack');
var Creationix = require('creationix');
//var Creationix = require("/Users/matt/play/creationix/index.js");

var mdns = require('mdns');
var root = __dirname;

// Stack up a server and start listening
HTTP.createServer(Stack(
  Creationix.log(),
  ReMyth.ReMythNavigate(),
  ReMyth.ReMythDVR(),
  ReMyth.ReMythFrontends(),
  ReMyth.ReMythVideo(),
  Creationix.static("/app", root + "/app"),
  Creationix.static("/", root + "/index.html")  
)).listen(port);

var formatHost = function(host) {
  if(host[host.length-1] === '.') {
    return host.substring(0, host.length-1);
  }
}

//advertise that remyth is running
var ad = mdns.createAdvertisement(mdns.tcp('remyth'), port);
ad.start();

// Attach listener for mythfrontend service
global.frontends = {};
global.selectedFrontend = {}
var frontendBrowser = mdns.createBrowser(mdns.tcp('mythfrontend'));
frontendBrowser.on('serviceUp', function(service) {
  service.host = formatHost(service.host);

  global.frontends[service.name] = service;
});
frontendBrowser.on('serviceDown', function(service) {
  delete global.frontends[service.name];
});
frontendBrowser.start();

// Attach listener for master mythbackend service
var masterBackendBrowser = mdns.createBrowser(mdns.tcp('mythbackend-master'));
masterBackendBrowser.on('serviceUp', function(service) {
  service.host = formatHost(service.host);

  global.masterBackend = service;
});
masterBackendBrowser.on('serviceDown', function(service) {
  if(global.masterBackend !== undefined && service.name === global.masterBackend.name) {
    delete global.masterBackend;
  }
});
masterBackendBrowser.start();

// Attach listener for master mythbackend service
var masterBackendTempBrowser = mdns.createBrowser(mdns.tcp('mythbackend'));
masterBackendTempBrowser.on('serviceUp', function(service) {
  if(service.txtRecord.level === 'master') {
    service.host = formatHost(service.host);

    global.masterBackend = service;
  }
});
masterBackendTempBrowser.on('serviceDown', function(service) {
  if(global.masterBackend !== undefined && service.name === global.masterBackend.name) {
    delete global.masterBackend;
  }
});
masterBackendTempBrowser.start();

// Give the user a nice message on the standard output
console.log("Serving %s at http://localhost:%s/", root, port);
