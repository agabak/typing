namespace App.Home{
    'use strict';
    
    export interface IHomeController {
        title:String
    }

    export class HomeController implements IHomeController {
               public title:String ="Working with Typing"
    }

    angular.module('app.home')
           .controller('HomeController', HomeController)
}