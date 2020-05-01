import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },

  {
    path: "about", component: AboutComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
