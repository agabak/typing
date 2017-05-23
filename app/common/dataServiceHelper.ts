namespace Common{
     'use strict';

     export interface IDataServiceHelper {
        get(url: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        getWithKey(url: string, key: number): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        getWithStringKey(url: string, key: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        getWithQuerystring(url: string, params: any): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        postWithParameters(url: string, params: any): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        postWithParametersForFileUpload(url: string, params: any): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
        postWithoutParameters(url: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
    }

    //  This helper service makes writing our data access services MUCH simpler
    //  It forces conventions to be followed, and removes a ton of redudnant boilerplate code from our data services

    export class DataServiceHelper implements IDataServiceHelper {
        public static $inject: string[] = ['$http', 'urlHelper'];

        constructor(private $http: angular.IHttpService,
                    private urlHelper: IUrlHelper) {
        }

        public get(url: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>Issues a GET request (stripping trailing slash)</summary>
            let fullUrl: string = this.urlHelper.removeTrailingSlashOnUrl(url);
            return this.$http.get(fullUrl);
        }

        public getWithKey(url: string, key: number): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>Issues a GET request by simply appending the key value to the end of the URL after a trailing slash</summary>
            let fullUrl: string = this.urlHelper.addTrailingSlashOnUrl(url) + key;
            return this.$http.get(fullUrl);
        }

        public getWithStringKey(url: string, key: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>
            ///   Issues a GET request by simply appending the key value as a string to the end of the URL after a trailing
            ///   slash
            /// </summary>
            let fullUrl: string = this.urlHelper.addTrailingSlashOnUrl(url) + key;
            return this.$http.get(fullUrl);
        }

        public getWithQuerystring<T>(url: string, params: T): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>Issues a GET request (stripping trailing slash)</summary>
            return this.$http.get(this.urlHelper.removeTrailingSlashOnUrl(url), { params: params });
        }

        public postWithParameters<T>(url: string, params: T): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>Issues a POST request by putting parameter key/values into the request body</summary>
            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url), params);

        }

        // IHttpService doesn't allow this as a valid call with only one
        // param so add the extra {}
        public postWithoutParameters(url: string): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            /// <summary>Issues a POST request but with no parameters (rare)</summary>
            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url), {});
        }

        /// reference article  https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
        public postWithParametersForFileUpload<T>(url: string, params: T): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {

            return this.$http.post(this.urlHelper.removeTrailingSlashOnUrl(url),
                params,
                {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
        }
    }

      angular.module('common')
        .service('dataServiceHelper', DataServiceHelper);
}