var Url = require('url');
var http = require('http');

exports.validate = function (req, res, next, support) {

  if (!req.uri) { req.uri = Url.parse(req.url); }
  var path = unescape(req.uri.pathname).replace(/\.\.+/g, '.');

  if(path.indexOf("/") === 0) {
    path = path.substring(1);
  }
  if(path.lastIndexOf("/") === path.length - 1) {
    path = path.substring(0, path.length - 1);
  }

  var pathArray = path.split('/');

  var api, method, action;
  if(pathArray[0] !== undefined) {
    api = pathArray[0];
  }
  if(pathArray[1] !== undefined) {
    method = pathArray[1];
  }
  if(pathArray[2] !== undefined) {
    action = pathArray[2];
  }

  if(api !== "rest" || method !== method) {
    return false;
  } else {
    if(method === undefined) {
      return;
    }

    if(!this.contains(support.methods, method)) {
      return;
    }

    if(action === undefined) {
      res.writeHead(500);
      res.end("No action provided");
      return;
    }

    if(!this.contains(support.actions, action)) {
      res.writeHead(500);
      res.end("Unsupported action: " + action);
      return;
    }

    var url_parts = Url.parse(req.url, true);
    var query = url_parts.query;

    return {
      method: method,
      action: action,
      query: query
    }
  }
};

exports.contains = function(array, value) {
  for(var x = 0; x < array.length; x++) {
    if(array[x] === value) {
      return true;
    }
  }
  return false;
}

exports.getParameterString = function(parameters) {
  var param_str = '';
  for (var key in parameters) {
    var value = parameters[key];
    if(param_str.length == 0) {
      param_str = '?';
    } else {
      param_str += '&';
    }
    param_str += key + '=' + value;
  }

  return param_str;
}

exports.sendRequest = function(response, service, api, parameters, root, frontend) {
  var path = '/' + service + '/' + api;
  if(parameters) {
    path += this.getParameterString(parameters);
  }

  var host, port;
  if(service === 'Frontend') {
    console.log("selected frontend is: " + frontend);

    var frontend = global.frontends[frontend];

    if(!frontend) {
      response.writeHead(200);
      response.end("Could not determine frontend to send request to.  Frontend was either not sent, or might no longer be available.");
      return;
    }

    host = frontend.host;
    port = frontend.port;
  } else {
    host = global.masterBackend.host
    port = global.masterBackend.port;
  }

  console.log("Executing following: " + host + ":" + port + path);

  var options = {
    host: host,
    port: port,
    path: path,
    headers: {
      'Accept': 'application/json'
    }
  };

  var getRoot = this.getRoot;

  if(service === 'Content') {
    http.get(options, function(http_res) {
      http_res.on('data', function(chunk) {
        response.write(chunk, 'binary');
      });
      http_res.on('end', function() {
        response.end();
      });
      response.writeHead(http_res.statusCode, http_res.headers);

    });
  } else {
    http.get(options, function (http_res) {
      var data = "";

      http_res.on("data", function (chunk) {
        data += chunk;
      });

      http_res.on("end", function () {
        var returnString = data;
        if(root) {
          returnString = getRoot(returnString, root);
        }

        response.writeHead(200);
        response.end(returnString);
      });
    });
  }
}

exports.getRoot = function(object, root) {
  var returnObject = object;
  if(!(returnObject instanceof Object)) {
    returnObject = JSON.parse(returnObject);
  }
  var rootArray = root.split('.');
  for(var next in rootArray) {
    next = rootArray[next];
    returnObject = returnObject[next];
  }
  var returnString = JSON.stringify(returnObject);
  return JSON.stringify(returnObject);
}