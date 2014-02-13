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
 .controller( 'HomeCtrl', function HomeController( $scope, $firebase, firebaseUrl ) {

  var _ref = new Firebase(firebaseUrl);

  $scope.todos = $firebase(_ref).$child('todos');
  $scope.newTodo = '';
  $scope.editedTodo = null;

  $scope.addTodo = function () {
    var newTodo = $scope.newTodo.trim();
    $scope.todos.$add({
      title: newTodo,
      completed: false
    });
    $scope.newTodo = '';
  };
 
  $scope.editTodo = function (id) {
    $scope.editedTodo = $scope.todos[id];
    $scope.originalTodo = angular.extend({}, $scope.editedTodo);
  };  

  $scope.doneEditing = function (id) {
    $scope.editedTodo = null;
    var title = $scope.todos[id].title.trim();
    if (title) {
      $scope.todos.$save(id);
    } else {
      $scope.removeTodo(id);
    }
  };

  $scope.revertEditing = function (id) {
    $scope.todos[id] = $scope.originalTodo;
    $scope.doneEditing(id);
  };

  $scope.removeTodo = function (id) {
    $scope.todos.$remove(id);
  };

  $scope.toggleCompleted = function (id) {
    var todo = $scope.todos[id];
    todo.completed = !todo.completed;
    $scope.todos.$save(id);
  };

  $scope.clearCompletedTodos = function () {
    angular.forEach($scope.todos.$getIndex(), function (index) {
      if ($scope.todos[index].completed) {
        $scope.todos.$remove(index);
      }
    });
  };
})
.filter('todoFilter', function () {
  return function (input) {
    var filtered = {};
    angular.forEach(input, function (todo, id) {      
        if (todo.completed != true) {
          filtered[id] = todo;
        }      
    });
    return filtered;
  };
});