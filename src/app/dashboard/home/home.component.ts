import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { PlayoutService } from '../../_core/_services/playout.service';
import { CoreService } from '../../_core/_services/core.service';
import { PieceModel } from '../../_core/_models/piece.model';
import { SketchModel } from '../../_core/_models/sketch.model';
import { PlayoutModel } from '../../_core/_models/playout.model';
import { CmdModel } from '../../_core/_models/cmd.model';
declare var moment: any;


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

    private _totalDuration : string = "00:00:00";

	
	constructor(private playoutService: PlayoutService, private coreService : CoreService){
		
		this.playoutService.init();
		
		this.playoutService.getPieceList().subscribe( resp  => {
			this.pieceLst = resp;
            
            
        })

		this.coreService.getPlResp().subscribe( resp => {
			
			this.playoutLst = resp;
            this.getTotalDuration();

		});
	}

	
	
	/**
	 * Add a piece/pl to playout list
	 */
	onPlayoutDrop($event: any) {
		
		let pl = new PlayoutModel();
		pl.piece = $event.dragData;
		this.playoutLst.push(pl);
		pl.currentPos = this.playoutLst.indexOf(pl);
        this.getTotalDuration();

	}

	/**
	 * Remove an item from playout list
	 */	
	onDelPlItem(po : PlayoutModel, index : number ) {
		
		po.currentPos = index;
		this.removeItem(po, this.playoutLst);
        this.getTotalDuration();
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
       
		this.currenPoItem = po.piece.name;
		this.switchLiveMode(index);
        this.getTotalDuration();
		
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
		this.switchLiveMode();
	}

    /**
     * Switch to Live mode
     * @param {number} index => the pieces less than the index will be eliminated
     */
    switchLiveMode(index: number = 0): void {
        let cmd: CmdModel = new CmdModel();
        cmd.mode = 1; // 1 => live mode

        //get the pieces greater than the index
        var filteredList = this.playoutLst.filter( (item,i) => {
            if(i >=index)
                return true;
            else         
                return false;
 
        });

        //get piece list
        cmd.pieceList = filteredList.map(item => item.piece);    
        this.coreService.switchMode(cmd);

        //remove the pieces less than the index
        this.playoutLst = filteredList;

        console.log(cmd)
    }

    private getTotalDuration(){
        var totalDuration = moment.duration("PT0.000000S", moment.ISO_8601);
         //calculate total duration
        this.playoutLst.forEach(item => {

            totalDuration.add(moment.duration(item.piece.duration, moment.ISO_8601));

        })
        
        this._totalDuration = moment.utc(totalDuration.asMilliseconds()).format("HH:mm:ss");
            

    }
	
 }