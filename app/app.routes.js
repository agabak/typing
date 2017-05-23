var App;
(function (App) {
    'use strict';
    var RouteConfig = (function () {
        function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpParamSerializerProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                templateUrl: "/app/home/home.html",
                controller: App.HomeController,
                controllerAs: 'vm',
            });
        }
        return RouteConfig;
    }());
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpParamSerializerProvider'];
    angular.module('app')
        .config(RouteConfig);
})(App || (App = {}));
