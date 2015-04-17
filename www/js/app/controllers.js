
/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
 angular.module('app.controllers', [])
 .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
 .controller('ListCtrl', [
        '$state', '$scope', 'UserService','AppService','$timeout',   // <-- controller dependencies
        function ($state, $scope, UserService, AppService, $timeout) {

            AppService.findStuff().then(function(_photos){
                $timeout(function(){
                    $scope.photoList = _photos;
                    console.log(JSON.stringify($scope.photoList))
                    $state.go("tab.list-detail", "id" :photoList.detail);
                },0);



            }, function(_error){
                alert(_error)
            });


        }])
 .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
