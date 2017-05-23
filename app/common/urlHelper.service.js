var Common;
(function (Common) {
    'use strict';
    var UrlHelper = (function () {
        function UrlHelper() {
            this.addTrailingSlashOnUrl = function (url) {
                /// <summary>Add a trailing slash to a URL if it is not there already</summary>
                return url.replace(/\/?$/, '/');
            };
            this.removeTrailingSlashOnUrl = function (url) {
                /// <summary>Remove a trailing slash from a URL</summary>
                return url.replace(/\/+$/, '');
            };
        }
        return UrlHelper;
    }());
    Common.UrlHelper = UrlHelper;
    angular.module('common')
        .service('urlHelper', UrlHelper);
})(Common || (Common = {}));
