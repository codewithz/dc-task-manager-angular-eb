import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateGuardService],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [CanActivateGuardService],
    data: {
      roles: ['Admin', 'Employee']
    }
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
