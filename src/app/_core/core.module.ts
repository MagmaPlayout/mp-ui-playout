import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { AlertComponent } from './_directives/alert.component';
import { SanitizeHtmlPipe} from './_pipes/sanitizeHtml.pipe';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { MediaService } from './_services/media.service';
import { CoreService } from './_services/core.service';
import { HttpClient} from './_helpers/httpClient';
import { AuthGuard } from './_guards/index';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AlertComponent,SanitizeHtmlPipe],
  declarations: [AlertComponent,SanitizeHtmlPipe],
  providers:[
    AlertService,
    UserService,
    MediaService,
    CoreService,
    AuthGuard,
    HttpClient
  ],
})
export class CoreModule { }
