angular.module('FrontendModule', ['ngCookies', 'ngResource']).factory('Frontend', 
  function($cookieStore, $resource) {
    var Frontend = {};

    Frontend.query = function(opts, callback) {
      return $resource('/rest/frontends/list').query(opts, callback);
    }

    Frontend.getStatus = function(frontend, callback) {
      return $resource('/rest/frontend/status').get({frontend: frontend}, callback);
    }

    Frontend.selectFrontend = function(user, frontend, callback) {
      console.log('selecting frontend: ' + frontend);

      $resource('/rest/frontends/select').get({name: frontend, username: user}, function() {
        $cookieStore.put('ReMythSelectedFrontend', frontend);

        callback();
      });
    }

    Frontend.isSelected = function() {
      var selectedFrontend = $cookieStore.get('ReMythSelectedFrontend');

      console.log(selectedFrontend);

      return (selectedFrontend !== undefined && selectedFrontend.length > 0);
    }

    Frontend.getSelected = function() {
      return $cookieStore.get('ReMythSelectedFrontend');
    }

    Frontend.playRecording = function(recording, frontend) {
      $resource('/rest/dvr/playRecording').get(
        {
          ChanId: recording.Channel.ChanId,
          StartTime: recording.StartTime,
          frontend: frontend
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

    Frontend._executeAction = function(action, callback) {
      $resource(action).get({frontend: Frontend.getSelected()}, callback);
    }

    return Frontend;
  }
);