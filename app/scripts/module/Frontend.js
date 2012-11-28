angular.module('FrontendModule', ['ngCookies', 'ngResource']).factory('Frontend', 
  function($cookieStore, $resource) {
    var Frontend = {};

    Frontend.query = function(opts, callback) {
      opts.buster = new Date();
      return $resource('/rest/frontends/list').query(opts, callback);
    }

    Frontend.getStatus = function(frontend, callback) {
      return $resource('/rest/frontend/status').get({frontend: frontend, buster: new Date()}, callback);
    }

    Frontend.selectFrontend = function(frontend, callback) {
      console.log('selecting frontend: ' + frontend);

      $resource('/rest/frontends/select').get({name: frontend, buster: new Date()}, function() {
        Frontend.selectedFrontend = frontend;

        //$cookieStore.put('ReMythSelectedFrontend', frontend);

        callback();
      });
    }

    Frontend.isSelected = function() {
      var selectedFrontend = Frontend.selectedFrontend;
      //var selectedFrontend = $cookieStore.get('ReMythSelectedFrontend');

      return (selectedFrontend !== undefined && selectedFrontend.length > 0);
    }

    Frontend.getSelected = function() {
      return Frontend.selectedFrontend;
      //return $cookieStore.get('ReMythSelectedFrontend');
    }

    Frontend.playRecording = function(recording, frontend) {
      $resource('/rest/dvr/playRecording').get(
        {
          ChanId: recording.Channel.ChanId,
          StartTime: recording.Recording.StartTs,
          frontend: frontend,
          buster: new Date()
        });
    }

    Frontend.playVideo = function(video, frontend) {
      $resource('/rest/video/play').get(
        {
          Id: video.Id,
          frontend: frontend,
          buster: new Date()
        });
    }

    Frontend.executeSkipCommercialBack = function(callback) {
      Frontend._executeAction('/rest/navigate/commercialSkipBack', callback);
    }

    Frontend.executeSkipCommercial = function(callback) {
      Frontend._executeAction('/rest/navigate/commercialSkip', callback);
    }

    Frontend.executeStop = function(callback) {
      Frontend._executeAction('/rest/navigate/stop', callback);
    }

    Frontend.executePause = function(callback) {
      Frontend._executeAction('/rest/navigate/pause', callback);
    }

    Frontend.executePlay = function(callback) {
      Frontend._executeAction('/rest/navigate/play', callback);
    }

    Frontend.executeRewind = function(callback) {
      Frontend._executeAction('/rest/navigate/rewind', callback);
    }

    Frontend.executeFastForward = function(callback) {
      Frontend._executeAction('/rest/navigate/fastForward', callback);
    }

    Frontend.increaseSpeed = function(callback) {
      Frontend._executeAction('/rest/navigate/increaseSpeed', callback);
    }

    Frontend.decreaseSpeed = function(callback) {
      Frontend._executeAction('/rest/navigate/decreaseSpeed', callback);
    }

    Frontend.navigateUp = function () {
      Frontend._executeAction('/rest/navigate/up');
    };

    Frontend.navigateDown = function() {
      Frontend._executeAction('/rest/navigate/down');
    };

    Frontend.navigateLeft = function() {
      Frontend._executeAction('/rest/navigate/left');
    };

    Frontend.navigateRight = function() {
      Frontend._executeAction('/rest/navigate/right');
    };

    Frontend.select = function() {
      Frontend._executeAction('/rest/navigate/select');
    };

    Frontend.showGuide = function() {
      Frontend._executeAction('/rest/navigate/guide');
    };

    Frontend.watchLiveTV = function() {
      Frontend._executeAction('/rest/navigate/livetv');
    };

    Frontend.mainMenu = function() {
      Frontend._executeAction('/rest/navigate/mainmenu');
    };

    Frontend.volumeUp = function() {
      Frontend._executeAction('/rest/navigate/volumeUp');
    };

    Frontend.volumeDown = function() {
      Frontend._executeAction('/rest/navigate/volumeDown');
    };

    Frontend._executeAction = function(action, callback) {
      $resource(action).get({frontend: Frontend.getSelected(), buster: new Date()}, callback);
    }

    return Frontend;
  }
);