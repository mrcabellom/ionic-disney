import {Injectable} from 'angular2/core'
import {Http,URLSearchParams, RequestOptions} from 'angular2/http';
import {Attraction} from '../models/attraction';
import {AppSettings} from '../settings';
import 'rxjs/Rx';


@Injectable()
export class AttractionsService{
	
	private attractionsEndPoint = AppSettings.API_ENDPOINT;

	constructor(private http: Http){
     
	}

	getAttractions(){
		return this.http.get(this.attractionsEndPoint)
		.map(res => {
			  var response = res.json();
			  var attractions: Array<Attraction> = [];
			  for(var i=0,li=response.length; i<li; i++){
			  		var attraction:Attraction = new Attraction(response[i]);
			  		attractions.push(attraction);
			  }
			  return attractions;
		});
	}

	getAttractionsByDate(attractionId, startDate, endDate){
		var searchParams: URLSearchParams = new URLSearchParams();
		searchParams.set('attractionId',attractionId);
		searchParams.set('startDate',startDate);
		searchParams.set('endDate',endDate);
		var requestOptions = new RequestOptions(
			{search: searchParams }
		);
		return this.http.get(this.attractionsEndPoint + '/aggregate',requestOptions)
			.map(res => res.json());
	}
}