describe('MovieCore', function() {

	var PopularMovies;
	var $httpBackend;

	beforeEach(module('movieCore'));

	beforeEach(inject(function(_PopularMovies_, _$httpBackend_) {
		PopularMovies = _PopularMovies_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	})

	it('should create popular movie', function() {
		// '{"movieId":"tt0076759","description":"Great movie!"}'
		// var expectedData = function(data) {
		// 	return angular.fromJson(data).movieId === 'tt0076759';
		// }
		// var expectedData = '{"movieId":"tt0076759","description":"Great movie!"}'
		// var expectedData = /{"movieId":"tt0076759","description":".*"}/;
		var expectedData = {"movieId":"tt0076759","description":"Great movie!"}
		
		$httpBackend.expectPOST(/./, expectedData)
			.respond();

		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'Great movie!'
		});

		popularMovie.$save();

		expect($httpBackend.flush).not.toThrow();
	});

	it('should get popular movie by id', function() {
		$httpBackend.expectGET('popular/tt0076759')
			.respond(200);

		PopularMovies.get({ movieId: 'tt0076759' });

		expect($httpBackend.flush).not.toThrow();
	});

	it('should update popular movie', function() {
		$httpBackend.expectPUT('popular')
			.respond(200);
		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'Great movie!'
		});

		popularMovie.$update();

		expect($httpBackend.flush).not.toThrow();
	})

});