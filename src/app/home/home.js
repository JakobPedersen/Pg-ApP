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
  'ui.router'
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
 .controller( 'HomeCtrl', function HomeController( $scope, SessionService ) {
  $scope.activeTodos = [{ 
    "title" : "Ovn skal rengøres",
    "timestamp" : "14-03-2013 14:38",
    "createdBy" : "Jakse79",
    "id" : 1
    }];

    $scope.completedTodos = [{ 
    "title" : "Ovn skal rengøres",
    "timestamp" : "14-03-2013 14:38",
    "completedBy" : "Jakse79",
    "id" : 2
    }];      
  })

 .factory("TodoService", function( $firebase ) {
  var ref = new Firebase("https://pg-np.firebaseio.com/todoList");
  return {
    getTodos: function() {
      var todos = [];
      ref.on("child_added", function(snapshot) {
        todos.push(snapshot.val());
      });
      return todos;
    },
    addTodo: function(message) {
      ref.push(message);
    }
  };
});