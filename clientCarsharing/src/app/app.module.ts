import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {CarService} from "./services/car.service";
import {authInterceptorProviders} from "./interceptor/auth.interceptor";
import { CarCardComponent } from './car-card/car-card.component';
import { CarListComponent } from './car-list/car-list.component';
import {RouterModule} from "@angular/router";
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    AdminPanelComponent,
    CarCardComponent,
    CarListComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, AppRoutingModule, RouterModule
  ],
  providers: [CarService, authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
