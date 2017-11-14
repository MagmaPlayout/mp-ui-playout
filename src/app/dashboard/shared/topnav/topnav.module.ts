import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopNavComponent } from './topnav';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
       
    ],
    declarations: [TopNavComponent],
    exports: [TopNavComponent]
})

export class TopnavModule {
    
}
