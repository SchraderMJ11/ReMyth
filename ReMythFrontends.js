var Url = require('url');
var http = require('http');
var restUtil = require('./ReMythRestUtil');

var support = {
  methods: ['frontends', 'frontend'],
  actions: ['list', 'select', 'status']
};

module.exports = function setup(mount, root) {
  return function handle(req, res, next) {
  	var service = restUtil.validate(req, res, next, support);
    if(!service) {
      return next();
    }

    if(service.action === 'list') {
      var frontends = [];
      for(var frontendName in global.frontends) {
        frontends.push({name: frontendName});
      }

      res.writeHead(200);
      res.end(JSON.stringify(frontends));
    } else if(service.action === 'select') {
      var selectFrontend = service.query.name;
      var username = service.query.username
      if(global.frontends[selectFrontend] !== undefined) {
        global.selectedFrontend[username] = selectFrontend;

        res.writeHead(200);
        res.end(selectFrontend);
      } else {
        res.writeHead(500);
        res.end("There is no frontend by the name of: " + selectFrontend);
      }
    } else if(service.action === 'status') {
      restUtil.sendRequest(res, 'Frontend', 'GetStatus', undefined, undefined, service.query.frontend);
    }
  };
};
