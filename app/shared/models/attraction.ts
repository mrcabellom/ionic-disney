export class Attraction {
	
	attractionId: string;
	name: string;
	id: string
	waitTime: any;
	type: string;
	createdAt : string;

	constructor(attractionData: any){
		this.attractionId = attractionData.attractionId;
		this.name = attractionData.name;
		this.id = attractionData.id;
		this.waitTime = attractionData.waitTime;
		this.type = attractionData.type;
		this.createdAt = attractionData.createdAt;
	}

	getId(){
		return this.attractionId.split(';')[0];
	}

	hasFastPass(){
		return this.waitTime.fastPass.available;
	}	

	isClosed(){
		return this.waitTime.status === 'Closed';
	}

	isOperating(){
		return this.waitTime.status === 'Operating';
	}

    isDown(){
    	return this.waitTime.status === 'Down';
    }

    getWaitTime(){
    	return this.waitTime.postedWaitMinutes;
    }

   	getStatus(){
   		return this.waitTime.status;
   	}

}