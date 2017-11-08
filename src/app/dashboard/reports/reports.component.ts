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
 
    exportCsv() {
        let filename = "mp-report"+this.model.starttime+"_"+this.model.endtime+".csv";
        var sep = ", "; // Change csv separator here
        var newLine = "\n";
        var log = this.rows;
        var csvLines = new Array();

        // Creates csv header
        var header = "Media"+sep+"Duration"+sep+"Resolution"+sep+"Frame rate"+sep+
            "Start"+sep+"End"+sep+"Filter"+sep+"Path"+sep+"Supp Name"+sep+
            "Supp. Phone"+sep+"Supp Email"+newLine;
        csvLines.push(header);

        // Create each csv line parsing row data
        for (let line of log){
            let filter = (line.filter!=null)?line.filter:"";
            let supPhone = (line.supplierPhone!=null)?line.supplierPhone:"";
            let supEmail = (line.supplierEmail!=null)?line.supplierEmail:"";

            csvLines.push(line.pieceName+sep+
                line.duration+sep+
                line.resolution+sep+
                line.frameRate+sep+
                line.starttime+sep+
                line.endtime+sep+
                filter+sep+
                line.piecePath+sep+
                line.supplierName+sep+
                supPhone+sep+
                supEmail+sep+
                newLine);
        }

        // Generate the file and make the client download it
        let blob = new Blob(csvLines, {type: "csv"});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            let elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }
}
