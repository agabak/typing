var App;
(function (App) {
    'use strict';
    var HomeController = (function () {
        function HomeController() {
            this.title = "Working with Typing";
        }
        return HomeController;
    }());
    App.HomeController = HomeController;
    angular.module('app')
        .controller('HomeController', HomeController);
})(App || (App = {}));
