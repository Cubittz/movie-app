describe('omdb service', function() {
    var movieData = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 48 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"945,400","imdbID":"tt0076759","Type":"movie","Response":"True"};
    var movieDataById = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 48 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"945,400","imdbID":"tt0076759","Type":"movie","Response":"True"};
    var omdbApi = {};
    var $httpBackend;

    beforeEach(module('omdb'));
    beforeEach(inject(function(_omdbApi_, _$httpBackend_){
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return search movie data', function() {
        var response;

        $httpBackend.when('GET', 'http://www.omdbapi.com/?v=1&s=star%20wars')
            .respond(200, movieData);

        omdbApi.search('star wars')
            .then(function(data) {
                response = data;
            });

        $httpBackend.flush();

        expect(response).toEqual(movieData);
    });

    it('should handle error', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(500);

        omdbApi.find('tt0076759')
            .then(function(data) {
                response = data;
            })
            .catch(function() {
                response = 'Error!';
            });

        $httpBackend.flush();

        expect(response).toEqual('Error!');
    });


    it('should return movie data by id', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(200, movieDataById);

        omdbApi.find('tt0076759')
            .then(function(data) {
                response = data;
            });

        $httpBackend.flush();

        expect(response).toEqual(movieDataById);
    });
});