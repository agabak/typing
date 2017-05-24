namespace App {
    'use strict';

    class RouteConfig {
        public static $inject: string[] = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        constructor($stateProvider: angular.ui.IStateProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $locationProvider: angular.ILocationProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('home', {
                url: '/',
                templateUrl: '/app/home/home.html',
                controller: Home.HomeController,
                controllerAs: 'vm',
            });

            // Specify HTML5 mode (using the History APIs) or HashBang syntax.
            $locationProvider.html5Mode(false);
        }
    }
    angular.module('app')
        .config(RouteConfig);
}
