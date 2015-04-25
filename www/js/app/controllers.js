
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

            function updateUI() {
                AppService.findStuff().then(function(_photos){
                    $timeout(function(){
                        $scope.photoList = _photos;
                        //console.log(JSON.stringify($scope.photoList))
                       // $state.go("tab.list-detail", "id" :photoList.detail);
                    },0);



                }, function(_error){
                    JSON.stringify(alert(_error));
                });
            }

            $scope.$on( "$ionicView.enter", function( scopes, states ) {
                console.log("$ionicView.enter");
                console.log('ListCtrl:$stateParams '+JSON.stringify($stateParams));

                if ($stateParams.forceUpdate) {
                  updateUI();
                }
            });
        updateUI()

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

 .controller('NewItemCtrl', [
        '$state', '$scope', 'AppService', //'st.timepicker'  // <-- controller dependencies
        function ($state, $scope, AppService) {
            $scope.particulars = {
                colour: "",
                detail: "",
                //location:"",
                //starttime:"",
                time:"",

            };


             
     


            $scope.createNew = function() {
                if ($scope.particulars.colour == "" || $scope.particulars.detail == "") {
                    alert("Sorry, you didn't input a full entry.")
                    $state.go('tab.list', {});
                } else {

                    $scope.time = {};
                     $scope.time.starttime = new Date().Format("YYYY-MM-DD HH:00");
                     $scope.time.endtime = new Date().Format("YYYY-MM-DD HH:00");

                     console.log($scope.time.starttime);

                    AppService.addOneItem($scope.particulars.colour,$scope.particulars.detail)
                      .then(function(_newObject) {
                        console.log(JSON.stringify(_newObject, null, 2));

                        // force an update since I added an item
                        $state.go('tab.list', {forceUpdate:true});
                    }, function(_error) {
                        alert(JSON.stringify(_error));
                        $state.go('tab.list', {});
                    });
                }
            };

        }]);
