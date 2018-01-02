import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';

import { UserService } from './Service/user.service'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        Ng2Bs3ModalModule],

    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent
    ],

    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService],

    bootstrap: [AppComponent]

})
export class AppModule { }