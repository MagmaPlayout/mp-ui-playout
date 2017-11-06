import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { PlayoutService } from '../../_core/_services/playout.service';
import { CoreService } from '../../_core/_services/core.service';
import { PieceModel } from '../../_core/_models/piece.model';
import { SketchModel } from '../../_core/_models/sketch.model';
import { PlayoutModel } from '../../_core/_models/playout.model';
import { CmdModel } from '../../_core/_models/cmd.model';


/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
	moduleId: module.id,
	selector: 'livemode',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css'],
})
export class HomeComponent {

	currenPoItem : string;

	pieceLst : Array<PieceModel> = new Array<PieceModel>();
 
    playoutLst : Array<PlayoutModel> = new Array<PlayoutModel>(); 

	sketchContent : string;

	
	constructor(private playoutService: PlayoutService, private coreService : CoreService){
		
		this.playoutService.init();
		
		this.playoutService.getPieceList().subscribe( resp  => {
			console.log(resp);
			this.pieceLst = resp;
            
        })

		this.coreService.getPlResp().subscribe( resp => {
			
			this.playoutLst = resp;

		});

	}

	
	
	/**
	 * Add a piece/pl to playout list
	 */
	onPlayoutDrop($event: any) {
		
		let pl = new PlayoutModel();
		pl.piece = $event.dragData;
        console.log(pl);
		this.playoutLst.push(pl);
		pl.currentPos = this.playoutLst.indexOf(pl);

	}

	/**
	 * Remove an item from playout list
	 */	
	onDelPlItem(po : PlayoutModel, index : number ) {
		
		po.currentPos = index;
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

		console.log("onDragEnd-> currentPos=" + po.currentPos);
	
	}

	/**
     * TO-DO -> redefinir
	 * Play piece/pl
	 */
	onPlayPlItem(po: PlayoutModel, index: number) {
        /*
		po.currentPos = index;
		
		this.currenPoItem = po.piece.name;
		this.coreService.goto(po);
        */
		
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

	/**
	 * On click switch mode
	 */
	onClickBtnSwitchmode(){
		let cmd : CmdModel = new CmdModel();
		cmd.mode = 1; // 1 = live mode
		cmd.pieceList = this.playoutLst.map(item => {
			return item.piece;
		});
		
		this.coreService.switchMode(cmd);
	}
	
 }