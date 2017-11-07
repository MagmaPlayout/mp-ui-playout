import { Component, Input } from '@angular/core';
import { TagService } from '../../../_core/_services/tag.service';
import { TagModel } from '../../../_core/_models/tag.model';

@Component({
  selector: 'app-media-tag',
  templateUrl: './media-tag.component.html',
  styleUrls: ['./media-tag.component.css']
})
export class MediaTagComponent {
    private query = '';
    private tagList : Array<TagModel> = [];
    private tagFilteredList : Array<TagModel> = [];
    private tagSelectedList : Array<TagModel> = [];

    @Input()
    set tagImportedList(tagList : Array<TagModel>){
        this.tagSelectedList = tagList;

    }
 
    constructor(private tagService : TagService ) {

       this.getTags();
    }

    private getTags(){

        this.tagService.getAll().subscribe(resp => {
            this.tagList = resp;  
        });
    }

    private onFilter() {

        if (this.query !== ""){
            this.tagFilteredList = this.tagList.filter(function(tag){
                return tag.tag.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.tagFilteredList = [];
        }
    }

    private onClickSelect(item){

        this.tagSelectedList.push(item);
        this.query = '';
        this.tagFilteredList = [];
    }

    private onClickRemove(item){

        this.tagSelectedList.splice(this.tagSelectedList.indexOf(item),1);
    }

    private onNew($event){    

        let tag : TagModel = <TagModel> {tag : this.query};
        
        //if the tag not exist 
        if(this.tagList.find(item => item.tag == this.query) == undefined ){
            this.tagService.insert(tag).subscribe(resp => true );  
            this.tagList.push(tag);          
        }

        this.tagSelectedList.push(tag);
        this.query = "";

        //is necessary for not trigger submit event.
        $event.preventDefault();
    
    }

    /**
     * returns selected tags
     */
    public getSelectedTags() : Array<TagModel>{
        
        return this.tagSelectedList;
    }

    /**
     * clear selected tags
     */
    public clearSelectedTags() : void {
        
        this.tagSelectedList = [];
    }


}
