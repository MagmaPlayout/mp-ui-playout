import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
import { MediaService } from '../../_core/_services/media.service';
import { CoreService } from '../../_core/_services/core.service';
import { MediaModel } from '../../_core/_models/media.model';
import { SketchModel } from '../../_core/_models/sketch.model';
import { PlayoutModel } from '../../_core/_models/playout.model';


/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'livemode',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css'],
})
export class HomeComponent {

	@ViewChild(MediainfoComponent)
  	private mediaInfoPopup: MediainfoComponent;
	
	currenPoItem : string;

	sketchLst : Array<SketchModel> ;
	
	mediaLst : Array<MediaModel> = new Array<MediaModel>();
 
    playoutLst : Array<PlayoutModel> = new Array<PlayoutModel>(); 

	sketchContent : string;

	
	constructor(private playoutService: MediaService, private coreService : CoreService){
		
		this.playoutService.init();
		
		this.playoutService.getMediaList().subscribe( resp  => {
			
			this.mediaLst = resp;
            
        })

		this.playoutService.getSketchList().subscribe( resp  => {	
		
			this.sketchLst = resp;         
        })

		
		this.coreService.getPlResp().subscribe( resp => {
			
			this.playoutLst = resp;

		});

	}

	/**
	 * Draw a sketch content inside sketchPreview box
	 */
	onSketchDrop($event: any) {

		let sketch : SketchModel;
		sketch = $event.dragData;
		this.sketchContent = sketch.htmlContent;	
	}
	
	/**
	 * Add a media/pl to playout list
	 */
	onPlayoutDrop($event: any) {
		
		let pl = new PlayoutModel();
		pl.media = $event.dragData;
		this.playoutLst.push(pl);
		pl.currentPos = this.playoutLst.indexOf(pl); 
		this.coreService.apndMedia(pl);
		
		
			
	}

	/**
	 * Remove an item from playout list
	 */	
	onDelPlItem(po : PlayoutModel, index : number ) {
		
		po.currentPos = index;
		this.coreService.remove(po);
		this.removeItem(po, this.playoutLst);

	}

	/**
	 * Move an item from playout list
	 */	
	onDragStartPo(po: PlayoutModel) {
		
		po.oldPos = this.playoutLst.indexOf(po);
		console.log("onDragStart -> oldPos=" + po.oldPos);
	
	}

	onDragEndPo(po: PlayoutModel) {
		
		po.currentPos = po.newPos = this.playoutLst.indexOf(po);	// newPos no tiene sentido
		this.coreService.move(po);

		console.log("onDragEnd-> currentPos=" + po.currentPos);
	
	}

	/**
	 * Play media/pl
	 */
	onPlayPlItem(po: PlayoutModel, index: number) {
	
		po.currentPos = index;
		
		this.currenPoItem = po.media.name;
		this.coreService.goto(po);
		
	}


	onClickMediaInfo(media: MediaModel){
		console.log(media);
		this.mediaInfoPopup.show(media);
	}

	/**
	 * Remove anything element of a list
	 */	
	private removeItem(item: any, list: Array<any>) {

		let index = list.map((e) => {
			return e
		}).indexOf(item);

		list.splice(index, 1);

	}
	
 }