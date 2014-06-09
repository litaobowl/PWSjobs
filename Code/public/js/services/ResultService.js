angular.module('ResultService', []).factory('Result', ['$http', function($http) {

	return {
		// call to get all results
		get : function() {
			return $http.get('/api/results');
		},

		// call to POST and create a new nerd
		create : function(nerdData) {
			return $http.post('/api/results', nerdData);
		},

		// call to DELETE a nerd
		delete : function(id) {
			return $http.delete('/api/results/' + id);
		}
	}		

}]);