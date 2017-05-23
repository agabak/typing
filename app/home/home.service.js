var App;
(function (App) {
    var Home;
    (function (Home) {
        'use strict';
        var HomeService = (function () {
            function HomeService(dataServiceHelper) {
                this.dataServiceHelper = dataServiceHelper;
            }
            HomeService.prototype.getAll = function () {
                return this.dataServiceHelper.get('/main/GetAll');
            };
            return HomeService;
        }());
        HomeService.$inject = ['dataServiceHelper'];
        Home.HomeService = HomeService;
        angular.module('app.home')
            .service('homeService', HomeService);
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
