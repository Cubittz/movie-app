angular.module('omdb', [])
    .factory('omdbApi', function($http, $q) {
        var service = {};
        var data;
        var baseUrl = 'http://www.omdbapi.com/?';

        function httpPromise(url) {
            var deferred = $q.defer();
            console.log(url);
            $http.get(url)
                .then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    console.log(error);
                });
            return deferred.promise;
        }

        service.find = function(id) {
            return httpPromise(baseUrl + 'i=' + id);
        }

        service.search = function(query) {
            return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
        }


        return service;
    });