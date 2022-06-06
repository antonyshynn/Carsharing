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
import { FaqsComponent } from './faqs/faqs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';

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
    FaqsComponent,
    FeedbackComponent,
    AboutUsComponent,
    ProfileComponent,
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
