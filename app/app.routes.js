var App;
(function (App) {
    'use strict';
    var RouteConfig = (function () {
        function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: '/app/home/home.html',
                controller: App.HomeController,
                controllerAs: 'vm',
            });
            // Specify HTML5 mode (using the History APIs) or HashBang syntax.
            $locationProvider.html5Mode(false);
        }
        return RouteConfig;
    }());
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    angular.module('app')
        .config(RouteConfig);
})(App || (App = {}));
