import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnauthorizedService } from './interceptors/jwt-unauthorized.service';
import { TeamSizeValidatorDirective } from './directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from './directives/client-location-status-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    NotFoundComponent,
    ProjectsComponent,
    LoginComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: () => {
            return (sessionStorage.getItem("currentUser") ?
              JSON.parse(sessionStorage.getItem("currentUser") as string).token : null)
          }
        }
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnauthorizedService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
