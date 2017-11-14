import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../_core/_services/user.service';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {
	private userLogged : string; // name of the user logged

	constructor	(private userService : UserService){

	}		

	ngOnInit(){

		this.userService.check().subscribe( data => this.userLogged = data.name );
	}

	changeTheme(color: string): void {
		var link: any = ('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		var body: any = ('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = ('#sidebar');
		var mainContainer: any = ('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}

}
