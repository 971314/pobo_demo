/**
 * Created by pobo on 2016/9/27.
 */
// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    // template: '<h3>My Dashboard</h3>',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})
// export class DashboardComponent {
//     templateUrl: 'dashboard.component.html'
// }


export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }
    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    // gotoDetail(hero: Hero): void { /* not implemented yet */}
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}

// export class DashboardComponent implements OnInit {
//
//     heroes: Hero[] = [];
//
//     // constructor(private heroService: HeroService) { }
//
//
//     constructor(
//         private router: Router,
//         private heroService: HeroService) {
//     }
//     ngOnInit(): void {
//         this.heroService.getHeroes()
//             .then(heroes => this.heroes = heroes.slice(1, 5));
//     }
//
//     // gotoDetail(hero: Hero): void { /* not implemented yet */}
//     gotoDetail(hero: Hero): void {
//         let link = ['/detail', hero.id];
//         this.router.navigate(link);
//     }
// }