function VideoCtrl($scope, $timeout, $location, $rootScope, Frontend, Video) {

  if(!Frontend.isSelected()) {
    $location.path('/');
  }

  $scope.initialized = false;

  $scope.videos = Video.list();

  $scope.clickVideo = function(video) {
    $scope.playingVideo = true;
    Frontend.playVideo(video, Frontend.getSelected());

    $location.path('/remote');
  }
  
  $scope.monitorStatus = function() {
    var status = Frontend.getStatus(Frontend.getSelected(), function() {
      var state = status.FrontendStatus.State.state;
      if(state === 'WatchingVideo') {
        $location.path('/clicker');
        return;
      }
      else if(state === 'WatchingPreRecorded' 
          || state === 'WatchingRecording') {
        $location.path('/recordings');
        return;
      }

      $scope.initialized = true;
    });
  }

  $scope._monitor = setInterval($scope.monitorStatus, 1000);
  $scope.$on('$destroy', function() { 
    clearInterval($scope._monitor); 
  });
}
