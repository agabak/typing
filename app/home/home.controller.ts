namespace App.Home{
    'use strict';
    
    export interface IHomeController {
        title:String;
        getAllUser():void;
        ListUser:any[];
    }

    export class HomeController implements IHomeController {
         public static $inject: string[] = ['$state','homeService' ]
               public title:String ="Today's News Headlines, Breaking News & Recent News- | Watanzania leo";
               public ListUser:any[] = [];
             constructor(private $state: angular.ui.IStateService,
                    private homeService: Home.IHomeService) {
                        
             this.homeService.getAll().then((response:any)=>{
                this.ListUser = response.data
             })
        }
        public getAllUser():void {
        }
    }
    
    angular.module('app.home')
           .controller('HomeController', HomeController)
}