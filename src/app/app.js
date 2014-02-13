angular.module( 'Pg-ApP', [
  'templates-app',
  'templates-common',
  'Pg-ApP.home',
  'Pg-ApP.login',
  'ui.router',
  'firebase'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {

  'use strict';

  console.log('myAppConfig');

  $urlRouterProvider.otherwise( '/home' );
})

.run(function ($rootScope, $location, AuthenticationService, RoleService, SessionService) {

  'use strict';

  console.log('App run');

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/login'];
  var routesForAdmin = ['/admin'];

  // check if current location matches route  
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  // check if current location matches route  
  // var routeAdmin = function (route) {
  //   return _.find(routesForAdmin,
  //     function (noAuthRoute) {
  //       return _.str.startsWith(route, noAuthRoute);
  //     });
  // };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    console.log('$stateChangeStart');
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      //ev.preventDefault();
      $location.path('/login');
    }
    // if route requires admin role and user is not part of the admin group
    // else if (routeAdmin($location.url()) && !RoleService.validateRoleAdmin(SessionService.currentUser)) {
    //   // redirect back to login
    //   ev.preventDefault();
    //   $location.path('/login');
    // }
  });
})

.value("firebaseUrl", "https://pg-app.firebaseio.com")

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, SessionService ) {  
  console.log('AppCtrl');
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeSuccess');
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | pg-app' ;
    }
  });  
})

.factory('AuthenticationService', function (SessionService, $firebase, $firebaseSimpleLogin, firebaseUrl) {

  'use strict'; 

  var _ref = new Firebase(firebaseUrl); 
  var _auth = new FirebaseSimpleLogin(_ref, function(error, user) {

    if (error) {
      // an error occurred while attempting login
      SessionService.currentUser = null;
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
      SessionService.currentUser = user;
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    } else {
      // user is logged out
      SessionService.currentUser = null;
      console.log('user is logged out');
    }

  });

  return {

    login: function () {
      console.log('login');
      _auth.login('facebook');      
    },

    logout: function (user) {
      console.log('logout');
      _auth.logout('facebook');      
    },

    isLoggedIn: function () {
      console.log('isLoggedIn with : ' + SessionService.currentUser);
      return _auth.user !== null && SessionService.currentUser !== null;
    }
  };
})

.factory('RoleService', function () {

  'use strict';

  console.log('RoleService');

  var adminRoles = ['admin'];
  var otherRoles = ['user'];

  return {
    validateRoleAdmin: function (currentUser) {
      return currentUser ? _.contains(adminRoles, currentUser.role) : false;
    },

    validateRoleOther: function (currentUser) {
      return currentUser ? _.contains(otherRoles, currentUser.role) : false;
    }
  };
})

.factory('SessionService', function () {

  'use strict';

  console.log('SessionService');

  return {
    currentUser: null
  };
}); 