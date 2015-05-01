
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

                if //($stateParams.forceUpdate) {
                    (states.fromCache && states.stateName == "tab.list") {
                  updateUI();
                }
            });
        updateUI()

        }])
 .controller('AccountCtrl', [
        '$state', '$scope', '$stateParams', 'UserService', 'AppService', '$timeout',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService, AppService, $timeout) {

            //debugger;

            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });

            function updateUI() {
            AppService.findUserItems($scope.user).then(function(_photos){
                    $timeout(function(){
                        $scope.userPhotoList = _photos;
                    },0);
                }, function(_error){
                    JSON.stringify(alert(_error));
                });
            };
            updateUI();

            $scope.doDeleteItem = function (myObject) {
              AppService.deleteOneItem(myObject) ({
                success: function(results) {
                  $scope.sessions = results;

                },
                error: function(error) {
                  alert("Error: " + error.code + " " + error.message);
                }
              });
            $state.go($state.current, {}, {reload: true});
            };
        }])


/*
 .controller('ListDetailCtrl', ['$state', '$scope', 'AppService', '$timeout', '$stateParams', 'UserService', // <-- controller dependencies
    function($state, $scope, AppService, $timeout, $stateParams, UserService) {

       //console.log($stateParams.id);
       
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
      $scope.doRequest = function () {
        alert("I am a button!");
        var thisItem = AppService.findOneItem($stateParams.itemId);
        console.log($stateParams.id);
        console.log(thisItem.colors);
        thisItem.set("requestor", UserService.currentUser());
       $scope.photo = [];
        $scope.Add = function () {
          $scope.photo.push({requestor: })
        }
      };
    }]) */

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
                }else if ($scope.particulars.dinner == true && $scope.particulars.lunch == true
                                                             && $scope.particulars.breakfast == true  ) {
                    alert("Select one meal time, make three posts " + 
                        "to be listed for both lunch and dinner.")
                    //$state.go('tab.list', {});
                }else if ($scope.particulars.lunch == true && $scope.particulars.breakfast == true ) {
                    alert("Select one meal time, make two posts " + 
                        "to be listed for both breakfast & lunch.")
                    //$state.go('tab.list', {});
                }  else if ($scope.particulars.breakfast == true && $scope.particulars.dinner == true ) {
                    alert("Select one meal time, make two posts " + 
                        "to be listed for both breakfast and dinner.")
                    //$state.go('tab.list', {});
                } else if ($scope.particulars.dinner == true && $scope.particulars.lunch == true ) {
                    alert("Select one meal time, make two posts " + 
                        "to be listed for both lunch and dinner.")
                    //$state.go('tab.list', {});
                }  else {

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
