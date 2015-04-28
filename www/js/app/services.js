
angular.module('app.services', [])

.service('AppService', ['$q', 'ParseConfiguration',
	function ($q, ParseConfiguration) {

		return {
			findStuff : function() {
				var Photos = Parse.Object.extend('photo');
				var query = new Parse.Query(Photos);
				return query.find();
			},
			findOneItem : function(_id) {
			    var Photos = Parse.Object.extend('photo');
			    var query = new Parse.Query(Photos);
			    return query.get(_id);
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
			}
		}


	}]);

//$scope.particulars.starttime = new Date().Format("YYYY-MM-DD HH:00");