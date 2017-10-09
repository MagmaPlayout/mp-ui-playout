import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ReportService } from '../../_core/_services/report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
    providers : [FormBuilder]
})
export class ReportsComponent {
    complexForm;

    model = {
        mediaName : "",
        starttime :null,
        endtime: null
    };

    temp = [];
    rows = [];
    
    columns = [
        { prop: 'mediaName', name : 'Media' },
        { prop: 'mediaDuration', name : 'Duration' },
        { prop: 'mediaFrameRate', name : 'Frame rate' },
        { prop: 'mediaFrameCount', name : 'Frame count' },
        { prop: 'starttime', name : 'Start' },
        { prop: 'endtime', name : 'End' },
        { prop: 'supplierName', name : 'Supp. Name' },
        { prop: 'supplierPhone', name : 'Supp. Phone'  },
        { prop: 'supplierEmail', name : 'Supp Email' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private reportService: ReportService,fb: FormBuilder) {
        this.complexForm = fb.group({
           
            'startime' : [null, Validators.required],
            'endtime' : [null, Validators.required]
           
        })
    }

   

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.mediaName.toLowerCase().indexOf(val) !== -1 || !val;
        });

       
        this.rows = temp;
        
        this.table.offset = 0;
    }

    onSubmit() { 
        this.reportService.getByFilters(this.model).subscribe(resp => {
            this.rows = resp;
            this.temp = resp;
            
        });    
    }
 

}
