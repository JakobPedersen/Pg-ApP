/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
 angular.module( 'Pg-ApP.home', [
  'ui.router',
  'firebase'
  ])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
 .config(function config( $stateProvider ) {
  console.log('Home Config');
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
 .controller( 'HomeCtrl', function HomeController( $scope, todoService ) {

  todoService.setListToScope($scope);

  $scope.completeActiveTodo = function (activeTodo) {
    todoService.completeTodo(activeTodo);
  };

  $scope.addTodo = function () {
    todoService.addTodo($scope.newTitle);
    $scope.newTitle = '';
    $scope.showNewTodo = false;
  };
})


 .factory("todoService", function( $firebase ) {
  var _url = 'https://pg-app.firebaseio.com/todos';
  var _ref = new Firebase(_url);

  return {
    setListToScope: function(scope) {
      scope.todos = $firebase(_ref);
    },    
    addTodo: function(message) {
      _ref.push( { createdBy: 'Jakse79', title: message } );
    },
    completeTodo: function(todo) {
      var todoRef = new Firebase(_url + '/' + id);
      todoRef.update( { active: false, completedBy: 'Jakse79' } );      
    }
  };
});