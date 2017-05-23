var App;
(function (App) {
    var Home;
    (function (Home) {
        'use strict';
        var HomeController = (function () {
            function HomeController() {
                this.title = "Working with Typing";
            }
            return HomeController;
        }());
        Home.HomeController = HomeController;
        angular.module('app.home')
            .controller('HomeController', HomeController);
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
