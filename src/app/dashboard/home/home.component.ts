import { Component } from '@angular/core';
import { MediaService } from '../../_core/_services/media.service';
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
	medias : Array<MediaModel>;
	sketches : Array<SketchModel>;
	playout : Array<any> = [];
	sketchContent : string;

	constructor(private playoutService: MediaService){
		
		this.playoutService.init();
		
		this.playoutService.getMediaList().subscribe( data  => {
			
            this.medias = data;
            
        })

		this.playoutService.getSketchList().subscribe( data  => {			
            
			this.sketches = data;         
        })

	}
	
	droppedSketches = [];
	droppedItems = [];

	onSketchDrop(e: any) {
		console.log(e.dragData);
		let sketch : SketchModel;
		sketch = e.dragData;
		this.sketchContent = sketch.htmlContent;	
	}

	
	onMediasDrop(e: any) {
		this.medias.push(e.dragData.htmlContent);	
		//this.removeItem(e.dragData, this.list2)
	}
	
	onPlayoutDrop(e: any) {
		this.playout.push(e.dragData);
	
	}

	removeItem(item: any, list: Array<any>) {
		let index = list.map((e) => {
			return e.name
		}).indexOf(item.name);
		list.splice(index, 1);
	}
 }

