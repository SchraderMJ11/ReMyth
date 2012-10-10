var restUtil = require('./ReMythRestUtil');
var services = ['ReMythNavigate.js', 'ReMythDVR.js', 'ReMythFrontends.js'];

require('fs').readdirSync(__dirname).forEach(function (name) {
  if (restUtil.contains(services, name)) {
    var name = name.substr(0, name.length - 3);
    Object.defineProperty(exports, name, {get: function () {
      return require("./" + name);
    }, enumerable: true});
  }
});

