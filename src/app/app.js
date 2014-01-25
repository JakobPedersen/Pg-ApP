angular.module( 'Pg-ApP', [
  'templates-app',
  'templates-common',
  'Pg-ApP.home',
  'Pg-ApP.login',
  'ui.router',
  'firebase'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function($rootScope, $location, AuthenticationSvc) { 
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $firebase, $firebaseSimpleLogin ) {  
  var ref = new Firebase('https://pg-app.firebaseio.com');
  $scope.auth = $firebaseSimpleLogin(ref);
  

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | pg-app' ;
    }
  });  
});