// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
@Component({
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

    template: `
              <!--<h1>{{title}}</h1>-->
              <h2>My Heroes</h2>
              <ul class="heroes">
                <li *ngFor="let hero of heroes"
                  [class.selected]="hero === selectedHero"
                  (click)="onSelect(hero)">
                  <span class="badge">{{hero.id}}</span> {{hero.name}}
                </li>
              </ul>
              <!--<my-hero-detail [hero]="selectedHero"></my-hero-detail>-->
              <div *ngIf="selectedHero">
                  <h2>
                    {{selectedHero.name | uppercase}} is my hero
                  </h2>
                  <button (click)="gotoDetail()">View Details</button>
              </div>
            `,
    styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
    // providers: [HeroService]
})
// export class AppComponent {
//     title = 'Tour of Heroes';
//     heroes = HEROES;
//     selectedHero: Hero;
//     constructor(private heroService: HeroService) { }
//     // hero: Hero = {
//     //     id: 1,
//     //     name: 'Windstorm'
//     // };
//     onSelect(hero: Hero): void {
//         this.selectedHero = hero;
//     };
//     getHeroes(): void {
//         // this.heroes = this.heroService.getHeroes();
//         this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//     }
// }


// export class HeroesComponent implements OnInit {
//     title = 'Tour of Heroes';
//     heroes: Hero[];
//     selectedHero: Hero;
//     constructor(private heroService: HeroService) { }
//     getHeroes(): void {
//         this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//     }
//     ngOnInit(): void {
//         this.getHeroes();
//     }
//     onSelect(hero: Hero): void {
//         this.selectedHero = hero;
//     }
// }

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }
    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
