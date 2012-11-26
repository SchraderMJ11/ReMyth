function RemoteCtrl($scope, $timeout, $location, $rootScope, Frontend, User, Recording) {
  
  if(!Frontend.isSelected()) {
    $location.path('/');
  }

  $scope.frontendState = undefined;
  $scope.progress = undefined;
  $scope.playSpeed = undefined;

  $scope.getProgressBar = function() {
    return {
      "background-color": "red",
      "height": "32px",
      "width": "" + $scope.progress + "%"
    };
  }

  $scope.executeSkipCommercialBack = function() {
    Frontend.executeSkipCommercialBack();
  }

  $scope.executeSkipCommercial = function() {
    Frontend.executeSkipCommercial();
  }

  $scope.executeStop = function() {
    $scope.frontendState = undefined;
    Frontend.executeStop();
  }

  $scope.executePause = function() {
    $scope.playSpeed = 0;
    Frontend.executePause();
  }

  $scope.executePlay = function() {
    $scope.playSpeed = 1;
    Frontend.executePlay();
  }

  $scope.rewind = function() {
    $scope.playSpeed = -3;
    Frontend.executeRewind();
  }

  $scope.fastForward = function() {
    $scope.playSpeed = 3;
    Frontend.executeFastForward();
  }

  $scope.increaseSpeed = function() {
    $scope.playSpeed = 2;
    Frontend.increaseSpeed();
  }

  $scope.decreaseSpeed = function() {
    $scope.playSpeed = 0;
    Frontend.decreaseSpeed();
  }

  $scope.volumeUp = function() {
    Frontend.volumeUp();
  }

  $scope.volumeDown = function() {
    Frontend.volumeDown();
  }

  $scope.monitorStatus = function() {
    var status = Frontend.getStatus(Frontend.getSelected(), function() {
      var state = status.FrontendStatus.State.state;
      if(state === 'WatchingVideo') {
        $location.path('/videos');
      }
      else if(state !== 'WatchingPreRecorded' 
          && state !== 'WatchingRecording') {
        $location.path('/recordings');
      } else {
        $scope.frontendState = status.FrontendStatus.State;

        $scope.progress = Math.round(($scope.frontendState.secondsplayed / $scope.frontendState.totalseconds) * 100);
        
        $scope.playSpeed = $scope.frontendState.playspeed;

        if($rootScope.previousRecording === undefined) {
          $rootScope.previousRecording = Recording.query(status.FrontendStatus.State.chanid, status.FrontendStatus.State.starttime);
        }
      }
    });
  }

  $scope._monitor = setInterval($scope.monitorStatus, 1000);
  $scope.$on('$destroy', function() { 
    clearInterval($scope._monitor); 
  });
}