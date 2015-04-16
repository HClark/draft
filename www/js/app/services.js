angular.module('app.services', [])

.service('AppService', ['$q', 'ParseConfiguration',
	function ($q, ParseConfiguration) {

		return {
			findStuff : function() {
				var Photos = Parse.Object.extend('photo');
				var query = new Parse.Query(Photos);
				return query.find();
			}
		}

	}]);
