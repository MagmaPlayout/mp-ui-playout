import { Component } from '@angular/core';
import { TagService } from '../../../_core/_services/tag.service';
import { NotificationService } from '../../../_core/_services/notification.service';
import { TagModel } from '../../../_core/_models/tag.model';

@Component({
  selector: 'app-media-tag',
  templateUrl: './media-tag.component.html',
  styleUrls: ['./media-tag.component.css']
})
export class MediaTagComponent{
    public query = '';
    public tagList : Array<TagModel> = [];
    public tagFilteredList : Array<TagModel> = [];
    public tagSelectedList : Array<TagModel> = [];
 
    constructor(private _notification: NotificationService, private tagService : TagService ) {
       this.getTags();
    }

    getTags(){
        this.tagService.getAll().subscribe(resp => {
            this.tagList = resp;  
        });
    }

    onFilter() {
        if (this.query !== ""){
            this.tagFilteredList = this.tagList.filter(function(tag){
                return tag.tag.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.tagFilteredList = [];
        }
    }

    onClickSelect(item){
        this.tagSelectedList.push(item);
        this.query = '';
        this.tagFilteredList = [];
    }

    onClickRemove(item){
        this.tagSelectedList.splice(this.tagSelectedList.indexOf(item),1);
    }

    onNew(event){
        if(event.charCode == 13){
            let tag : TagModel = <TagModel> {tag : this.query};
          
            //if the tag not exist 
            if(this.tagList.find(item => item.tag == this.query) == undefined ){
                this.tagService.insert(tag).subscribe(resp => true );  
                this.tagList.push(tag);          
            }
                
            this.tagSelectedList.push(tag);
            this.query = "";
        }
    }


}
