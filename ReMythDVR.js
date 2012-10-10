var Url = require('url');
var http = require('http');
var restUtil = require('./ReMythRestUtil');

var support = {
  methods: ['dvr'],
  actions: ['recorded', 'recordedList', 'image', 'storage', 'playRecording', 'removeRecording']
};

module.exports = function setup(mount, root) {
  return function handle(req, res, next) {
  	var service = restUtil.validate(req, res, next, support);
    if(!service) {
      return next();
    }

    var action = service.action;
    if(action === 'recordedList') {
    	restUtil.sendRequest(res, 'Dvr', 'GetRecordedList', undefined, 'ProgramList.Programs');
    } else if(action === 'recorded') {
      restUtil.sendRequest(res, 'Dvr', 'GetRecorded', 
        {
          "ChanId": service.query.ChanId,
          "StartTime": service.query.StartTime
        }, 'Program');
    } else if(action === 'image') {
      restUtil.sendRequest(res, 'Content', 'GetPreviewImage', 
        {
          "ChanId": service.query.ChanId,
          "StartTime": service.query.StartTime
        });
    } else if(action === 'storage') {
      restUtil.sendRequest(res, 'Myth', 'GetStorageGroupDirs', undefined, 'StorageGroupDirList.StorageGroupDirs');
    } else if(action === 'playRecording') {
      console.log("Playing recording on channel: " + service.query.ChanId);
      console.log("Which started at: " + service.query.StartTime);
      restUtil.sendRequest(res, 'Frontend', 'PlayRecording',
        {
          "ChanId": service.query.ChanId,
          "StartTime": service.query.StartTime
        }, undefined, service.query.frontend);
    } else if(action === 'removeRecording') {
      console.log("Removing recording on channel: " + service.query.ChanId);
      console.log("Which started at: " + service.query.StartTime);
      restUtil.sendRequest(res, 'Dvr', 'RemoveRecorded',
        {
          "ChanId": service.query.ChanId,
          "StartTime": service.query.StartTime
        });
    }
  };
};
