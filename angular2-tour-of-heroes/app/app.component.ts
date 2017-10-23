/**
 * Created by pobo on 2016/9/27.
 */
import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
  //   template: `
  //   <h1>{{title}}</h1>
  //   <my-heroes></my-heroes>
  // `
  //   template: `
  //              <h1>{{title}}</h1>
  //              <a routerLink="/heroes">Heroes</a>
  //              <router-outlet></router-outlet>
  //            `

    template: `
               <h1>{{title}}</h1>
               <nav>
                 <!--<a routerLink="/dashboard">Dashboard</a>-->
                 <!--<a routerLink="/heroes">Heroes</a>-->
                 
                 <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
                 <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
               </nav>
               <router-outlet></router-outlet>
             `,
    styleUrls: ['app/app.component.css'],
})
export class AppComponent {
    title = 'Tour of Heroes';
}