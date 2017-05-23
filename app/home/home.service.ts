namespace  App.Home {
   'use strict'
    
  export interface IHomeService {
      getAll():angular.IPromise<angular.IHttpPromiseCallbackArg<any>>;
  }

  export class HomeService implements IHomeService {
       public static $inject: string[] = ['dataServiceHelper'];

       constructor(private dataServiceHelper: Common.IDataServiceHelper) {
        } 
      
       public getAll(): angular.IPromise<angular.IHttpPromiseCallbackArg<any>> {
            return this.dataServiceHelper.get(Home.ApplicationUrls.all);
        }
  }
   angular.module('app.home')
        .service('homeService', HomeService);
}