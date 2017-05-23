namespace App.Home{
    'use strict';
    
    export interface IHomeController {
        title:String;
        getAllUser():void;
        ListUser:any[];
    }

    export class HomeController implements IHomeController {
         public static $inject: string[] = ['$state','homeService' ]
               public title:String ="Working with Typing";
             constructor(private $state: angular.ui.IStateService,
                    private homeService: Home.IHomeService) {
        }

        public ListUser:any[] = [];

        public getAllUser():void {
            this.homeService.getAll().then((response:any)=>{
                this.ListUser = response.data
            })
        }
    }
    
    angular.module('app.home')
           .controller('HomeController', HomeController)
}