function RemoteCtrl($scope, $http) {
 
  $scope.navigateUp = function () {
    $scope.executeService('/rest/navigate/up');
  };

  $scope.navigateDown = function() {
    $scope.executeService('/rest/navigate/down');
  };

  $scope.navigateLeft = function() {
    $scope.executeService('/rest/navigate/left');
  };

  $scope.navigateRight = function() {
    $scope.executeService('/rest/navigate/right');
  };

  $scope.select = function() {
    $scope.executeService('/rest/navigate/select');
  };

  $scope.showGuide = function() {
    $scope.executeService('/rest/navigate/guide');
  };

  $scope.watchLiveTV = function() {
    $scope.executeService('/rest/navigate/livetv');
  };

  $scope.mainMenu = function() {
    $scope.executeService('/rest/navigate/mainmenu');
  };

  $scope.executeService = function(url) {
    $http.get(url)
      .success(function(data) {
        // succeeded :)
        // for now we aren't doing anything with this
      })
      .error(function(data) {
        // for now alert, yuck!
        alert(data);
      });
  };
 
}