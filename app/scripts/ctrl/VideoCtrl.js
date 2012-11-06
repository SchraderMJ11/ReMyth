function VideoCtrl($scope, $timeout, $location, $rootScope, Frontend) {

  if(!Frontend.isSelected()) {
    $location.path('/');
  }

  $scope.initialized = false;
  
  $scope.monitorStatus = function() {
    var status = Frontend.getStatus(Frontend.getSelected(), function() {
      var state = status.FrontendStatus.State.state;
      if(state === 'WatchingVideo') {
        $location.path('/clicker');
        return;
      }
      else if(state !== 'WatchingPreRecorded' 
          && state !== 'WatchingRecording') {
        $location.path('/recordings');
        return;
      }

      $scopoe.initialized = true;
    });
  }
}