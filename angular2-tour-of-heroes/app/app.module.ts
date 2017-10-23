/**
 * Created by pobo on 2016/9/27.
 */
// import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
//
// @NgModule({
//     imports:      [ BrowserModule ]
// })
// export class AppModule { }



import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';//增加的
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// import { AppComponent }   from './heroes.component.ts';
// import { HeroDetailComponent } from './hero-detail.component';

import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import { DashboardComponent }         from './dashboard.component';

import { routing } from './app.routing';
// @NgModule({
//     imports:      [ BrowserModule ],
//     declarations: [ AppComponent ],
//     bootstrap:    [ AppComponent ]
// })
// export class AppModule { }
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent
    ],
    providers: [
        HeroService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }