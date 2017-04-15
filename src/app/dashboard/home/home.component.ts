import { Component } from '@angular/core';


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
	sketches = [
        {name: "Clima", type: "sketch"},
        {name: "Reloj", type: "sketch"},
        {name: "Mosca XYZ", type: "sketch"}
	]
       

        
	medias = [
		{name: 'Los Simpsons', type: "media"},
		{name: 'Publi Noche',type: "media"},
		{name: 'Clip1',type: "media"},
		{name: 'Clip2',type: "media"},
		];
	
	playout = [
		{name: 'Los Simpsons', type: "playout"},
		{name: 'Clip1',type: "playout"},
		{name: 'Clip2',type: "playout"},
		];

	
	droppedSketches = [];
	droppedItems = [];

	onScketcheDrop(e: any) {
		this.droppedSketches.push(e.dragData);
		this.removeItem(e.dragData, this.sketches);
	}

	
	onMediasDrop(e: any) {
		this.medias.push(e.dragData);
		//this.removeItem(e.dragData, this.list2)
	}
	
	onPlayoutDrop(e: any) {
		this.playout.push(e.dragData);
		//this.removeItem(e.dragData, this.list1)
	}

	removeItem(item: any, list: Array<any>) {
		let index = list.map((e) => {
			return e.name
		}).indexOf(item.name);
		list.splice(index, 1);
	}
 }

