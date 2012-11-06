angular.module('VideoModule', ['ngResource']).factory('Video', 
  function($resource) {
    var Video = {};

    Video.list = function(opts, callback) {
      return $resource('/rest/video/list').query(opts, callback);
    }

    return Video;
});
