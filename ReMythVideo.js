var Url = require('url');
var http = require('http');
var restUtil = require('./ReMythRestUtil');

var support = {
  methods: ['video'],
  actions: ['list', 'play']
};

module.exports = function setup(mount, root) {
  return function handle(req, res, next) {
    var service = restUtil.validate(req, res, next, support);
    if(!service) {
      return next();
    }

    var action = service.action;
    if(action === 'list') {
    	restUtil.sendRequest(res, 'Video', 'GetVideoList', undefined, 'VideoMetadataInfoList.VideoMetadataInfos');
    } else if(action === 'play') {
      console.log("Playing video: " + service.query.Id);
      restUtil.sendRequest(res, 'Frontend', 'PlayVideo',
        {
          "Id": service.query.Id,
          "UseBookmark": true
        }, undefined, service.query.frontend);
    }
  };
};
