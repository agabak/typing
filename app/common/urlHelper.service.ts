namespace Common {
     'use strict';

    export interface IUrlHelper {
        addTrailingSlashOnUrl(url: string): string;
        removeTrailingSlashOnUrl(url: string): string;
    }

    export class UrlHelper implements IUrlHelper {
        constructor() {}

        addTrailingSlashOnUrl =(url: string) => {
            /// <summary>Add a trailing slash to a URL if it is not there already</summary>
            return url.replace(/\/?$/, '/');
        };

        removeTrailingSlashOnUrl=(url: string) => {
            /// <summary>Remove a trailing slash from a URL</summary>
            return url.replace(/\/+$/, '');
        };
    }
    
    angular.module('common')
        .service('urlHelper', UrlHelper);
}