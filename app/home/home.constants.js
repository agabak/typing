var App;
(function (App) {
    var Home;
    (function (Home) {
        'use strict';
        var ApplicationUrls = (function () {
            function ApplicationUrls() {
            }
            return ApplicationUrls;
        }());
        ApplicationUrls.details = '/ApplicationData/Get/';
        ApplicationUrls.create = '/ApplicationData/Create';
        ApplicationUrls.edit = '/ApplicationData/Edit';
        ApplicationUrls.all = '/ApplicationData/GetAll';
        Home.ApplicationUrls = ApplicationUrls;
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
