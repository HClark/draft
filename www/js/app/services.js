
angular.module('app.services', [])

.service('AppService', ['$q', 'ParseConfiguration',
	function ($q, ParseConfiguration) {

		return {
			findStuff : function() {
				var Photos = Parse.Object.extend('photo');
				//var Photos = Parse.Object.extend('photo');
				var query = new Parse.Query(Photos);
				return query.find();
			},
			findOneItem : function(_id) {
			    var Photos = Parse.Object.extend('photo');
			    var query = new Parse.Query(Photos);
			    return query.get(_id);
			},
			findUserItems : function() {
			    var Photos = Parse.Object.extend('photo');
			    var query = new Parse.Query(Photos);
			    query.equalTo("createdBy", Parse.User.current());
			    return query.find();
			},
			deleteOneItem : function(_deleteThis) {
				/*
				 myObject.destroy({
                  success: function(_deleteThis) {
                    // The object was deleted from the Parse Cloud.
                        alert("You have deleted session this item");
                        query.find({
                          success: function(results) {
                              $scope.sessions = results;
                              console.log(results);
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
                }); */


				//typeof _deleteThis;
				//console.log(Object.keys(_deleteThis));
				//var Photos = Parse.Object.extend('photo');
				//var query = new Parse.Query(Photos);
				/*query.get(_deleteThis, {
					success: function(_deleteThis) {
						console.log("Found the object to delete.")
						_deleteThis.destroy({});
					},
					error: function(object, error) {
						console.log("Nope, didn't find it. Try again.")
					}
				});*/
				_deleteThis.destroy({
					success: function(_deleteThis) {
						alert("I've deleted something");
					}
				})

			},
			addOneItem : function(_colors, _detail, _blackburn, _annex, _breakfast, _lunch, _dinner) {
				var Photos = Parse.Object.extend('photo');
				var addition = new Photos();

				addition.set("colors", _colors);
				addition.set("detail", _detail);
				addition.set("blackburn", _blackburn);
				addition.set("annex", _annex);
				addition.set("breakfast", _breakfast);
				addition.set("lunch", _lunch);
				addition.set("dinner", _dinner);
				addition.set("createdBy", Parse.User.current());

				if (_blackburn && !_annex) {
					addition.set("both",0);
				}
				else if (!_blackburn && _annex) {
					addition.set("both",1);
				}
				else {
					addition.set("both",2);
				}
				
				return addition.save(null, {});
			},
			updateItemReq : function() {

			}

		}


	}]);

//$scope.particulars.starttime = new Date().Format("YYYY-MM-DD HH:00");
