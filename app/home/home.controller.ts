namespace App{
    'use strict';
    
    export interface IHomeController {
        title:String
    }

    export class HomeController implements IHomeController {
               public title:String ="Working with Typing"
    }

    angular.module('app')
           .controller('HomeController', HomeController)
}