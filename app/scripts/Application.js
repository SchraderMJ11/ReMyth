angular.module('ReMyth', ['ngResource', 'UserModule', 'FrontendModule', 'RecordingModule']).config(
  function($routeProvider) {
    $routeProvider
      .when('/', {controller: LoginCtrl, templateUrl: 'app/view/login.html'})
      .when('/recordings', {controller: DVRCtrl, templateUrl: '/app/view/recordings.html'})
      .when('/remote', {controller: RemoteCtrl, templateUrl: '/app/view/remote.html'})
      .when('/clicker', {controller: ClickerCtrl, templateUrl: '/app/view/clicker.html'});
  }
);
