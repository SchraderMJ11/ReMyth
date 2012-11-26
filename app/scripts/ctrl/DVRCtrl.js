function DVRCtrl($scope, $location, $timeout, $rootScope, Recording, Frontend, User) {

  if(!Frontend.isSelected()) {
    $location.path('/');
  }

  $scope.initialized = false;

  $scope.filterLiveTV = {"Recording.RecGroup": "!LiveTV"};

  $scope.format = 'M/d/yy h:mm:ss a';

  $scope.recordings = Recording.queryList();

  $scope.previousRecording = $rootScope.previousRecording;
  $scope.previousRecordingConfirmNeeded = false;

  $scope.playingRecording = false;

  $scope.selectedRecording = undefined;

  $scope.sortOrder = "reverse";
  $scope.searchText = undefined;

  $scope.switchSortOrder = function() {
    if($scope.sortOrder === undefined) {
      $scope.sortOrder = "reverse";
    } else {
      $scope.sortOrder = undefined;
    }
  }

  $scope.refreshRecordings = function() {
    $scope.recordings = Recording.queryList();
  }

  $scope.clickRecording = function(recording) {
    $scope.playingRecording = true;
    Frontend.playRecording(recording, Frontend.getSelected());
    $rootScope.previousRecording = recording;

    $location.path('/remote');
  }

  $scope.clickDeleteRecording = function(recording) {
    if($scope.selectedRecording !== undefined && $scope.selectedRecording.ProgramId === recording.ProgramId) {
      $scope.selectedRecording = undefined;
    }
    else {
      $scope.selectedRecording = recording;
    }
  }

  $scope.cancelDeleteRecording = function() {
    $scope.selectedRecording = undefined;
  }

  $scope.clickDeletePreviousRecording = function() {
    if($scope.previousRecordingConfirmNeeded === true) {
      $scope.previousRecordingConfirmNeeded = false;
      $scope.previousRecording = undefined;
    }
    else {
      $scope.previousRecordingConfirmNeeded = true;
    }
  }

  $scope.ignorePreviousRecording = function() {
    $scope.previousRecordingConfirmNeeded = false;
    $scope.previousRecording = undefined;
  }

  $scope.deleteRecording = function(recording) {
    Recording.deleteRecording(recording, function() {
      if($scope.selectedRecording !== undefined && $scope.selectedRecording.ProgramId === recording.ProgramId) {
        $scope.selectedRecording = undefined;
      }
      if($scope.previousRecording !== undefined && $scope.previousRecording.ProgramId === recording.ProgramId) {
        $scope.previousRecordingConfirmNeeded = false;
        $scope.previousRecording = undefined;
      }

      setTimeout($scope.refreshRecordings, 250);
    });
  }
  $scope.cancelDeletePreviousRecording = function() {
    $scope.previousRecordingConfirmNeeded = false;
  }

  $scope.monitorStatus = function() {
    var selected = Frontend.getSelected();
    var status = Frontend.getStatus(selected, function() {
      if(status != undefined && status.FrontendStatus != undefined 
          && status.FrontendStatus.State != undefined) {
        var state = status.FrontendStatus.State.state;
        if (state === 'WatchingPreRecorded' || state === 'WatchingRecording') {
          $location.path('/remote');
          return;
        } else if(state === 'WatchingVideo') {
          $location.path('/videos');
          return;
        }

        $scope.initialized = true;
      }
    });
  }

  $scope._monitor = setInterval($scope.monitorStatus, 1000);
  $scope.$on('$destroy', function() { 
    clearInterval($scope._monitor); 
  });

}
