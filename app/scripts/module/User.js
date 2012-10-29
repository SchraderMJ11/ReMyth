angular.module('UserModule', ['ngCookies']).factory('User', function($cookieStore) {
  var User = {};

  User.isLoggedIn = function () {
    console.log('checking if user is logged in');
    if(!this.username) {
      User.username = $cookieStore.get('ReMythUsername');
    }

    return (User.username !== undefined && User.username.length > 0);
  }

  User.login = function(username) {
    console.log('logging in the user');
    this.username = username;

    $cookieStore.put('ReMythUsername', this.username);
    return true;
  }

  User.getUsername = function() {
    return $cookieStore.get('ReMythUsername');
  }

  return User;
});