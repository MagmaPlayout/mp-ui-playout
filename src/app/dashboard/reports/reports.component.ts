import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ReportService } from '../../_core/_services/report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var moment: any;

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
        starttime : moment().format("YYYY-MM-DD"),
        endtime:  moment().format("YYYY-MM-DD")
    };

    temp = [];
    rows = [];
    
    columns = [
        { prop: 'pieceName', name : 'Media' },
        { prop: 'duration', name : 'Duration' },
        { prop: 'resolution', name : 'Resolution' },
        { prop: 'frameRate', name : 'Frame rate' },
        { prop: 'frameCount', name : 'Frame count' },
        { prop: 'starttime', name : 'Start' },
        { prop: 'endtime', name : 'End' },
        { prop: 'filter', name : 'Filter' },
        { prop: 'sketch', name : 'Sketch' },
        { prop: 'piecePath', name : 'Path' },
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
            return d.pieceName.toLowerCase().indexOf(val) !== -1 || !val;
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
