import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { NotificationComponent } from './_directives/notification.component';
import { SanitizeHtmlPipe} from './_pipes/sanitizeHtml.pipe';
import {SimpleNotificationsModule, NotificationsService } from 'angular2-notifications-lite';
import { NotificationService } from './_services/notification.service';
import { UserService } from './_services/user.service';
import { PlayoutService } from './_services/playout.service';
import { CoreService } from './_services/core.service';
import { OccurrenceService } from './_services/occurrence.service';
import { ReportService } from './_services/report.service';
import { PieceService } from './_services/piece.service';
import { TagService } from './_services/tag.service';
import { FilterService } from './_services/filter.service';
import { HttpClient} from './_helpers/httpClient';
import { AuthGuard } from './_guards/index';

@NgModule({
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [NotificationComponent,SanitizeHtmlPipe],
  declarations: [
    NotificationComponent,
    SanitizeHtmlPipe],
  providers:[
    NotificationService,
    UserService,
    PlayoutService,
    CoreService,
    OccurrenceService,
    AuthGuard,
    HttpClient,
    ReportService,
    PieceService,
    TagService,
    FilterService
  ],
})
export class CoreModule { }
