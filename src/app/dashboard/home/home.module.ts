import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap';

import { TimelineComponent, NotificationComponent } from './home.component';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [HomeComponent, TimelineComponent, NotificationComponent],
    exports: [HomeComponent, TimelineComponent, NotificationComponent]
})

export class HomeModule { }
