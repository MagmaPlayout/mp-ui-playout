import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-media-creation',
    templateUrl: './media-creation.component.html',
    styleUrls: ['./media-creation.component.css']
})
export class MediaCreationComponent {
    public query = '';
    public tagList = [ "aah re gato","bueeeeeena","cartonero piola","gato", "gaterio","gaturro","turro", "wachi", "wachipiola", "guacho", "guachin"];
    public tagFilteredList = [];
    public tagSelectedList = [];
 
    constructor() {}

    tagsFilter() {
        if (this.query !== ""){
            this.tagFilteredList = this.tagList.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.tagFilteredList = [];
        }
    }

    tagsSelect(item){
        this.tagSelectedList.push(item);
        this.query = '';
        this.tagFilteredList = [];
    }

    tagsRemove(item){
        this.tagSelectedList.splice(this.tagSelectedList.indexOf(item),1);
    }
}
