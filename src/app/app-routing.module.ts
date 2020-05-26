import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { CourseListComponent } from './course-list/course-list.component'
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },

  {
    path: "about", component: AboutComponent
  },
  {
    path: "CourseList", component: CourseListComponent
  },
  {
    path: "CourseList/add", component: AddComponent
  },
  {
    path: "CourseList/edit", component: EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
