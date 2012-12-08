function ApplicationCtrl($scope, $location) {
  
  console.log($location);

  $scope.location = $location;

  $scope.getView = function() {
    var location = $location.path();
    if(location.indexOf('/') === 0) {
      location = location.substring('1');
    }
    console.log("view: " + location);
    return location;
  }

  $scope.getRecordingsActiveClass = function() {
    return $scope.getView() === 'recordings' ? 'active' : '';
  }
  
  $scope.getVideosActiveClass = function() {
    return $scope.getView() === 'videos' ? 'active' : '';
  }

  $scope.getClickerActiveClass = function() {
    return $scope.getView() === 'clicker' ? 'active' : '';
  }

  /*if(!Frontend.isSelected()) {
    $location.path('/');
  }

  $scope.navigateUp = function () {
    Frontend.navigateUp();
  };

  $scope.navigateDown = function() {
    Frontend.navigateDown();
  };

  $scope.navigateLeft = function() {
    Frontend.navigateLeft();
  };

  $scope.navigateRight = function() {
    Frontend.navigateRight();
  };

  $scope.select = function() {
    Frontend.select();
  };

  $scope.showGuide = function() {
    Frontend.showGuide();
  };

  $scope.watchLiveTV = function() {
    Frontend.watchLiveTV();
  };

  $scope.mainMenu = function() {
    Frontend.mainMenu();
  };*/
}