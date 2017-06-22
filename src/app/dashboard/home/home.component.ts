import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
import { PlayoutService } from '../../_core/_services/playout.service';
import { CoreService } from '../../_core/_services/core.service';
import { PieceModel } from '../../_core/_models/piece.model';
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
	
	pieceLst : Array<PieceModel> = new Array<PieceModel>();
 
    playoutLst : Array<PlayoutModel> = new Array<PlayoutModel>(); 

	sketchContent : string;

	
	constructor(private playoutService: PlayoutService, private coreService : CoreService){
		
		this.playoutService.init();
		
		this.playoutService.getPieceList().subscribe( resp  => {
			console.log(resp);
			this.pieceLst = resp;
            
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
	 * Add a piece/pl to playout list
	 */
	onPlayoutDrop($event: any) {
		
		let pl = new PlayoutModel();
		pl.piece = $event.dragData;
		this.playoutLst.push(pl);
		pl.currentPos = this.playoutLst.indexOf(pl); 
		this.coreService.apndPiece(pl);
		
		
			
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
	 * Play piece/pl
	 */
	onPlayPlItem(po: PlayoutModel, index: number) {
	
		po.currentPos = index;
		
		this.currenPoItem = po.piece.name;
		this.coreService.goto(po);
		
	}


	onClickMediaInfo(piece: PieceModel){
		console.log(piece);
		this.mediaInfoPopup.show(piece.media);
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