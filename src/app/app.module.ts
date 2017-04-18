import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './_core/core.module';
import { AlertService } from './_core/_services/alert.service';
import { UserService } from './_core/_services/user.service';
import { MediaService } from './_core/_services/media.service';
import { HttpClient} from './_core/_helpers/httpClient';
import { AuthGuard } from './_core/_guards/index';


/* Routing Module */


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,  
    AlertModule.forRoot(),
    CoreModule,
    DashboardModule, 
    LoginModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers:[
    AlertService,
    UserService,
    MediaService,
    AuthGuard,
    HttpClient
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
