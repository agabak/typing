namespace App {
     'use strict';

     class RouteConfig {
         public static $inject: string[] = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpParamSerializerProvider'];

         constructor($stateProvider: angular.ui.IStateProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $locationProvider: angular.ILocationProvider,
                    $httpParamSerializerProvider: angular.IServiceProvider){
            
                $urlRouterProvider.otherwise('/');
                $stateProvider.state('home', {
                url: '/',
                templateUrl: `/app/home/home.html`,
                controller: HomeController,
                controllerAs: 'vm',
            });
      }
  }

   angular.module('app')
        .config(RouteConfig);
}