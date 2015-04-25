
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
			addOneItem : function(_colors, _detail) {
				var Photos = Parse.Object.extend('photo');
				var addition = new Photos();

				addition.set("colors", _colors);
				addition.set("detail", _detail);
				//addition.set("locatoin", location);

				return addition.save(null, {});
			}
		}


	}]);

//$scope.particulars.starttime = new Date().Format("YYYY-MM-DD HH:00");