var App;
(function (App) {
    var Home;
    (function (Home) {
        'use strict';
        var HomeController = (function () {
            function HomeController($state, homeService) {
                this.$state = $state;
                this.homeService = homeService;
                this.title = "Working with Typing";
                this.ListUser = [];
            }
            HomeController.prototype.getAllUser = function () {
                var _this = this;
                this.homeService.getAll().then(function (response) {
                    _this.ListUser = response.data;
                });
            };
            return HomeController;
        }());
        HomeController.$inject = ['$state', 'homeService'];
        Home.HomeController = HomeController;
        angular.module('app.home')
            .controller('HomeController', HomeController);
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
