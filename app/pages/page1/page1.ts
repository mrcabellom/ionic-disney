import {Page, Nav, Platform, NavController, Alert} from 'ionic-angular';
import {AttractionsService} from '../../shared/services/attractions-service';
import {IdFilterPipe} from '../../shared/filters';
import {Page3} from '../page3/page3';
import {NgZone} from 'angular2/core';

declare var touchid: any;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [AttractionsService],
  pipes : [IdFilterPipe]
})
export class Page1 {
    attractions:any;
	constructor(
	private attractionsService : AttractionsService, 
	private nav: Nav, 
	private platform: Platform,
	private navController: NavController,
	private ngZone: NgZone){
		this.getAttractions();
	}

	getAttractions(refresher?:any){
		this.attractionsService.getAttractions().subscribe(
		    data => {
		        this.attractions = data;
		        if(refresher){
		        	refresher.complete();
		        }
		    },
		    err => {
		        console.log('There was an error retreveing attractions');
		    }
		);
	}
	
	getGraph(attractionId: string){
	    this.platform.ready().then(() => {
            touchid.checkSupport(() => {
                touchid.authenticate((result) => {
                    this.ngZone.run(() => {
	                    this.nav.push(Page3,{
	                    	attractionId: attractionId
	                    });
	                });
                }, (error) => {
                    this.navController.present(Alert.create({
                        title: "Attention!",
                        subTitle: error,
                        buttons: ["Close"]
                    }));
                }, "Please Authenticate");
            }, (error) => {
                this.navController.present(Alert.create({
                    title: "Attention!",
                    subTitle: "Touch ID is not supported",
                    buttons: ["Close"]
                }));
            });
        });
    }

}
