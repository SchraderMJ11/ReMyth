function ClickerCtrl($scope, $location, Frontend) {
  
  if(!Frontend.isSelected()) {
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
  };
}