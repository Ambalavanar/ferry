;(function() {

  angular
    .module('ferryApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ["$scope", "$mdSidenav", "$timeout", "$mdDialog", "$location", "$rootScope", "$http"];

  function LoginController($scope, $mdSidenav, $timeout, $mdDialog, $location, $rootScope, $http) {

       $scope.user = { rememberMe: true };

       $scope.submit = function() {
            $http({
                method: 'POST',
                url: '/loginpost',
                data: $.param({username: $scope.user.login, password: $scope.user.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
       }

       $scope.isInvalid = $location.search().status && $location.search().status === "invalid";

  }

})();