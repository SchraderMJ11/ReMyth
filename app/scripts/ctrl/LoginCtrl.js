function LoginCtrl($scope, $location, User, Frontend) {
  $scope.username = User.getUsername();
  $scope.frontend = undefined;
  
  $scope.frontends = Frontend.query({}, function() {
    $scope.frontend = Frontend.getSelected();

    if($scope.frontend === undefined || $scope.frontend.length > 0) {
      if($scope.frontends && $scope.frontends.length > 0) {
        $scope.frontend = $scope.frontends[0];
      }
    }
  });

  $scope.clickLogin = function() {
    if(User.login($scope.username)) {

      //Hack, look into why this is needed
      var name = $scope.frontend;
      if(name.name) {
        name = name.name;
      }

      Frontend.selectFrontend($scope.username, name, function () { 
        if(User.isLoggedIn() && Frontend.isSelected()) {
          $location.path('/recordings');
        }
      });
    }
  }

  $scope.getFrontendComboSelected = function(name) {
    if(name === $scope.frontend.name) {
      return "selected";
    }
  }
}
