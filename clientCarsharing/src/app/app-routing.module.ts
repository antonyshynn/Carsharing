import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {HomeComponent} from "./home/home.component";
import {CarListComponent} from "./car-list/car-list.component";
import {FaqsComponent} from "./faqs/faqs.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'carList', component: CarListComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'aboutUS', component: AboutUsComponent},
  { path: 'feedback', component: FeedbackComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
