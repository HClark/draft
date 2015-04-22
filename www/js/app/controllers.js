
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
        '$state', '$scope', 'UserService','AppService','$timeout', '$stateParams',   // <-- controller dependencies
        function ($state, $scope, UserService, AppService, $timeout, $stateParams) {

            AppService.findStuff().then(function(_photos){
                $timeout(function(){
                    $scope.photoList = _photos;
                    //console.log(JSON.stringify($scope.photoList))
                   // $state.go("tab.list-detail", "id" :photoList.detail);
                },0);



            }, function(_error){
                JSON.stringify(alert(_error));
            });

        }])
 .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }])

 .controller('ListDetailCtrl', ['$state', '$scope', 'AppService', '$timeout', '$stateParams', // <-- controller dependencies
    function($state, $scope, AppService, $timeout, $stateParams) {

        console.log($stateParams.id);
        AppService.findOneItem($stateParams.itemId).then(function(_photo) {
            $timeout(function() {
                $scope.photoList = _photo;
                console.log(JSON.stringify($scope.detail, null, 2));
            }, 0);

        }, function(_error) {
            alert(JSON.stringify(_error));
        });


    }])

 .controller('NewItemCtrl' [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
