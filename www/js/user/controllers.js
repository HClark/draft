/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [])
    .controller('LoginController', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;

            // ng-model holding values from view/html
            $scope.creds = {
                username: "adminuser",
                password: "password"
            };

            /**
             *
             */
            $scope.doLogoutAction = function () {
                UserService.logout()
                var thisUser = UserService.logout()

                if (thisUser) {
                    console.log("currentUser exists")
                    alert("error logging out")
                } else {
                    console.log("currentUser doesn't exist")
                    alert("logout success")
                    $state.go('app-login');
                }
            };

            /**
             *
             */
            $scope.doLoginAction = function () {
                UserService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {

                        alert("login success " + _response.attributes.username);

                        // transition to next state
                        $state.go('tab.list');

                    }, function (_error) {
                        alert("error logging in " + _error.message);
                    })
            };
        }])
    .controller('SignUpController', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.creds = {};

            /**
             *
             */
            $scope.signUpUser = function () {

                UserService.init();

                UserService.createUser($scope.creds).then(function (_data) {
                    $scope.user = _data;

                    alert("Success Creating User Account ");

                    $state.go('tab.list', {});

                }, function (_error) {
                    alert("Error Creating User Account " + _error.debug)
                });
            }
        }]);
