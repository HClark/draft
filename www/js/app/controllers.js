
/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
 angular.module('app.controllers', [])

 .controller('ListCtrl', [
        '$state', '$scope', 'UserService','AppService','$timeout', '$stateParams', '$http',  // <-- controller dependencies
        function ($state, $scope, UserService, AppService, $timeout, $stateParams, $http) {

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
        '$state', '$scope', '$stateParams', 'UserService', 'AppService', '$timeout',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService, AppService, $timeout) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


            AppService.findUserItems($scope.user).then(function(_photos){
                    $timeout(function(){
                        $scope.userPhotoList = _photos;
                    },0);
                }, function(_error){
                    JSON.stringify(alert(_error));
                });

            /*$scope.doDeleteItem = function () {
                var deletedItem = AppService.findOneItem($stateParams.itemId);
                AppService.deleteOneItem(deletedItem);
                alert("Deleting somehting")
            };*/

            $scope.doDeleteItem = function(myObject){
                myObject.destroy({
                  success: function(myObject) {
                    // The object was deleted from the Parse Cloud.
                        alert("You have deleted session this item");
                        query.find({
                          success: function(results) {
                              $scope.sessions = results;
                          },
                          error: function(error) {
                            alert("Error: " + error.code + " " + error.message);
                          }
                        });
                  },
                  error: function(myObject, error) {
                    // The delete failed.
                    // error is a Parse.Error with an error code and message.
                      alert(error);
                  }
                });
            }

            $scope.goToUpdate = function () {
              $state.go('update-account')
              console.log("You there yet?")
            }

        }])



 .controller('ListDetailCtrl', ['$state', '$scope', 'AppService', '$timeout', '$stateParams', // <-- controller dependencies
    function($state, $scope, AppService, $timeout, $stateParams) {

       console.log($stateParams.id);
       
        AppService.findOneItem($stateParams.itemId).then(function(_photo) {
            $timeout(function() {
                $scope.photoList = _photo;
                console.log(JSON.stringify($scope.detail, null, 2));
                //var location = 

                var okay = "yes!!";
                var test = 1;
                 if(test){
                   var okay = "yes!!"; 
                 }  

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
                blackburn: false,
                annex: false,
                breakfast: false,

                lunch: false,
                dinner: false,

            };

            

            //$scope.particulars=[{blackburn:false}];
            //$scope.particulars.blackburn=false;
            //$scope.particulars.annex=false;

        
            $scope.createNew = function() {
                if ($scope.particulars.colour == "" || $scope.particulars.detail == "") {
                    alert("Sorry, you didn't input a full entry.")
                    $state.go('tab.list', {});
                } else {

                    // $scope.time = {};
                    // $scope.time.starttime = new Date().Format("YYYY-MM-DD HH:00");
                    // $scope.time.endtime = new Date().Format("YYYY-MM-DD HH:00");

                    //console.log($scope.time.starttime);

                    AppService.addOneItem($scope.particulars.colour,$scope.particulars.detail,
                        $scope.particulars.blackburn,$scope.particulars.annex, $scope.particulars.breakfast,
                        $scope.particulars.lunch, $scope.particulars.dinner)
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
