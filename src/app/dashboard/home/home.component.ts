import { Component } from '@angular/core';
import { MediaService } from '../../_core/_services/media.service';
import { CoreService } from '../../_core/_services/core.service';
import { MediaModel } from '../../_core/_models/media.model';
import { SketchModel } from '../../_core/_models/sketch.model';

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
	
	mediaLst : Array<MediaModel>;
 
    playoutLst : Array<any> = []; 

	sketchLst : Array<SketchModel>;
	
	sketchContent : string;

	constructor(private playoutService: MediaService, private coreService : CoreService){
		
		this.playoutService.init();
		
		this.playoutService.getMediaList().subscribe( data  => {
			console.log("holaaaa");
            this.mediaLst = data;
            
        })

		this.playoutService.getSketchList().subscribe( data  => {			
            
			this.sketchLst = data;         
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

		this.coreService.apndMedia($event.dragData);
        this.playoutLst.push($event.dragData);
		
	}
	/**
	 * Remove a item from playout list
	 */
	onDelPlItem(item) {

		this.coreService.removeMedia(item);
		this.removeItem(item, this.playoutLst);

	}

	/**
	 * Play media/pl
	 */
	onPlayPlItem(item) {

		this.coreService.playMedia(item);
		
	}

	/**
	 * Remove anything element of a list
	 */
	removeItem(item: any, list: Array<any>) {

		let index = list.map((e) => {
			return e.name
		}).indexOf(item.name);
		list.splice(index, 1);
	}
	
 }