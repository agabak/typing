var Common;
(function (Common) {
    'use strict';
    //  This helper service makes writing our data access services MUCH simpler
    //  It forces conventions to be followed, and removes a ton of redudnant boilerplate code from our data services
    var DataServiceHelper = (function () {
        function DataServiceHelper($http, urlHelper) {
            this.$http = $http;
            this.urlHelper = urlHelper;
        }
        DataServiceHelper.prototype.get = function (url) {
            /// <summary>Issues a GET request (stripping trailing slash)</summary>
            var fullUrl = this.urlHelper.removeTrailingSlashOnUrl(url);
            return this.$http.get(fullUrl);
        };
        DataServiceHelper.prototype.getWithKey = function (url, key) {
            /// <summary>Issues a GET request by simply appending the key value to the end of the URL after a trailing slash</summary>
            var fullUrl = this.urlHelper.addTrailingSlashOnUrl(url) + key;
            return this.$http.get(fullUrl);
        };
        DataServiceHelper.prototype.getWithStringKey = function (url, key) {
            /// <summary>
            ///   Issues a GET request by simply appending the key value as a string to the end of the URL after a trailing
            ///   slash
            /// </summary>
            var fullUrl = this.urlHelper.addTrailingSlashOnUrl(url) + key;
            return this.$http.get(fullUrl);
        };
        DataServiceHelper.prototype.getWithQuerystring = function (url, params) {
            /// <summary>Issues a GET request (stripping trailing slash)</summary>
            return this.$http.get(this.urlHelper.removeTrailingSlashOnUrl(url), { params: params });
        };
        DataServiceHelper.prototype.postWithParameters = function (url, params) {
            /// <summary>Issues a POST request by putting parameter key/values into the request body</summary>
            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url), params);
        };
        // IHttpService doesn't allow this as a valid call with only one
        // param so add the extra {}
        DataServiceHelper.prototype.postWithoutParameters = function (url) {
            /// <summary>Issues a POST request but with no parameters (rare)</summary>
            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url), {});
        };
        /// reference article  https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
        DataServiceHelper.prototype.postWithParametersForFileUpload = function (url, params) {
            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url), params, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };
        return DataServiceHelper;
    }());
    DataServiceHelper.$inject = ['$http', 'urlHelper'];
    Common.DataServiceHelper = DataServiceHelper;
    angular.module('common')
        .service('dataServiceHelper', DataServiceHelper);
})(Common || (Common = {}));
