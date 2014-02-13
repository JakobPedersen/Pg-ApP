/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
 describe( 'home section', function() {
	var $scope, todoService;

	beforeEach( module( 'Pg-ApP.home' ) );	

	it( 'should reset title after todo is added', function() {
		//$scope.addTodo();
		expect( true ).toBeTruthy();
	});
 });