angular.module('RecordingModule', ['ngResource']).factory('Recording', 
  function($resource) {
    var Recording = {};

    Recording.queryList = function(opts, callback) {
      return $resource('/rest/dvr/recordedList').query(opts, callback);
    }

    Recording.query = function(ChanId, StartTime) {
      return $resource('/rest/dvr/recorded').get({
        ChanId: ChanId,
        StartTime: StartTime
      })
    }

    Recording.deleteRecording = function(recording, callback) {
      $resource('/rest/dvr/removeRecording').get(
        {
          ChanId: recording.Channel.ChanId,
          StartTime: recording.Recording.StartTs
        }, callback);
    }

    return Recording;
});
