import {Page, Nav, Platform} from 'ionic-angular';
import {AttractionsService} from '../../shared/services/attractions-service';
import {IdFilterPipe} from '../../shared/filters';
import {Page3} from '../page3/page3';
import {TouchID} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [AttractionsService],
  pipes : [IdFilterPipe]
})
export class Page1 {
    attractions:any;
    private instanceTouchId : TouchID;
	constructor(private attractionsService : AttractionsService, private nav: Nav, private platform: Platform){
		this.getAttractions();
		this.instanceTouchId = new TouchID();
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
			this.instanceTouchId.isAvailable().then(() =>{
				TouchID.verifyFingerprint('Verificar Huella').then(() =>{
					 this.nav.push(Page3, {
	      				attractionId: attractionId
	    			});
				},(error) => {
					console.log(error);
				});

			},(error) =>{
				console.log(error);
			});
		});
	}
}
