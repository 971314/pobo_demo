"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { Component } from '@angular/core';
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var HeroesComponent = (function () {
    function HeroesComponent(router, heroService) {
        this.router = router;
        this.heroService = heroService;
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            moduleId: module.id,
            selector: 'my-heroes',
            // template: '<h1>My SECOND Angular App </h1>'
            //
            //     template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
            //
            //     template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2>'
            //
            //     template: '<h1>{{title}}</h1>' +
            //     '<h2>{{hero.name}} details!</h2>' +
            //     '<div><label>id: </label>{{hero.id}}</div>' +
            //     '<div><label>name: </label>{{hero.name}}</div>'
            //     '<h1>{{title}}</h1>'+
            //   '<h2>{{hero.name}} details!</h2>'+
            //   '<div><label>id: </label>{{hero.id}}</div>'+
            //   '<div><label>name: </label>'+
            //     '<input value="{{hero.name}}" placeholder="name"></div>'
            //     '<input [(ngModel)]="hero.name" placeholder="name">'
            //
            //     template:'<h2>My Heroes</h2>'+
            // '<ul class="heroes">'+
            //     '<li *ngFor="let hero of heroes">'+
            //         '<span class="badge">{{hero.id}}</span> {{hero.name}}'+
            // '</li>'+
            // '</ul>',
            //
            //     template:`<h2>My Heroes</h2>
            //             <ul class="heroes">
            //                 <!--<li *ngFor="let hero of heroes" (click)="onSelect(hero)">-->
            //                     <!--<span class="badge">{{hero.id}}</span> {{hero.name}}-->
            //                 <!--</li>-->
            //                 <li *ngFor="let hero of heroes"
            //                   [class.selected]="hero === selectedHero"
            //                   (click)="onSelect(hero)">
            //                   <span class="badge">{{hero.id}}</span> {{hero.name}}
            //                 </li>
            //             </ul>
            //             <div *ngIf="selectedHero">
            //               <h2>{{selectedHero.name}} details!</h2>
            //               <div><label>id: </label>{{selectedHero.id}}</div>
            //               <div>
            //                 <label>name: </label>
            //                 <input [(ngModel)]="selectedHero.name" placeholder="name"/>
            //               </div>
            //             </div>`,
            template: "\n              <!--<h1>{{title}}</h1>-->\n              <h2>My Heroes</h2>\n              <ul class=\"heroes\">\n                <li *ngFor=\"let hero of heroes\"\n                  [class.selected]=\"hero === selectedHero\"\n                  (click)=\"onSelect(hero)\">\n                  <span class=\"badge\">{{hero.id}}</span> {{hero.name}}\n                </li>\n              </ul>\n              <!--<my-hero-detail [hero]=\"selectedHero\"></my-hero-detail>-->\n              <div *ngIf=\"selectedHero\">\n                  <h2>\n                    {{selectedHero.name | uppercase}} is my hero\n                  </h2>\n                  <button (click)=\"gotoDetail()\">View Details</button>\n              </div>\n            ",
            styles: ["\n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .heroes {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .heroes li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .heroes li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .heroes li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .heroes .text {\n    position: relative;\n    top: -3px;\n  }\n  .heroes .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n  }\n"],
        }), 
        __metadata('design:paramtypes', [router_1.Router, hero_service_1.HeroService])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map