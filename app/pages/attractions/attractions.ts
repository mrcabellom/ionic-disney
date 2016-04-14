import {Page, Nav, Platform, NavController, Alert} from 'ionic-angular';
import {AttractionsService} from '../../shared/services/attractions-service';
import {IdFilterPipe} from '../../shared/filters';
import {GraphPage} from '../graph/graph';
import {NgZone} from 'angular2/core';

declare var touchid: any;

@Page({
  templateUrl: 'build/pages/attractions/attractions.html',
  providers: [AttractionsService],
  pipes : [IdFilterPipe]
})
export class AttractionsPage {
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
		        console.log('There was an error retrieving attractions');
		    }
		);
	}
	
	getGraph(attractionId: string){
	    this.platform.ready().then(() => {
            touchid.checkSupport(() => {
                touchid.authenticate((result) => {
                    this.ngZone.run(() => {
	                    this.nav.push(GraphPage,{
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
