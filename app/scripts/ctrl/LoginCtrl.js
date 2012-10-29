function LoginCtrl($scope, $location, User, Frontend) {
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
    //Hack, look into why this is needed
    var name = $scope.frontend;
    if(name.name) {
      name = name.name;
    }

    Frontend.selectFrontend(name, function () { 
      if(Frontend.isSelected()) {
        $location.path('/recordings');
      }
    });
  }

  $scope.getFrontendComboSelected = function(name) {
    if(name === $scope.frontend.name) {
      return "selected";
    }
  }
}
