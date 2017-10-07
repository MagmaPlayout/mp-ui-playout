import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent{
  
  temp = [];
  rows = [
    { media: 'clip1.avi', duration: '0', resolution: '1080x720', name : 'Gato supp', phone: '1111111', email: 'info@mgial.com' },
    { media: 'clip2.avi', duration: '0', resolution: '1080x720', name : 'Gato supp', phone: '1111111', email: 'info@mgial.com' },
    { media: 'clip3.avi', duration: '0', resolution: '1080x720', name : 'Gato supp', phone: '1111111', email: 'info@mgial.com' },
  ];
  
  columns = [
    { prop: 'media' },
    { name: 'Duration' },
    { name: 'Resolution' },
    { name: 'Name' },
    { name: 'Phone' },
    { name: 'Email' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
    
  }

  fetch(cb) {
    cb(this.rows);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.media.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
