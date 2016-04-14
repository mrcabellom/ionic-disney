import {Page, NavParams} from 'ionic-angular';
import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from '../../shared/services/charts';
import {AttractionsService} from '../../shared/services/attractions-service';
import * as moment from 'moment';
import {AppSettings} from '../../shared/settings';


@Page({
  templateUrl: 'build/pages/graph/graph.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [AttractionsService]
})
export class GraphPage {
  
  private attractionId: string;
  private attractionsAggregate: Array<any>;
  private barChartSeries = ['Wait time average'];
  private barChartLabels = ['No Time'];
  private barChartData = [[0]];
  private barChartLegend:boolean = true;
  private lineChartType:string = 'Line';
  private barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
  };

  constructor(private navParams: NavParams, private attractionsService:AttractionsService) {
    this.attractionId = navParams.get('attractionId');
        
  }

  ngOnInit() {
    var endDate: string = moment().format(AppSettings.DATE_FORMAT);
    var startDate: string = moment().subtract(1, "days").format(AppSettings.DATE_FORMAT);
    this.attractionsService.getAttractionsByDate(this.attractionId, startDate, endDate).subscribe(
        data => {
           this.attractionsAggregate = data;
           this.setGraphData(data);
        },
        err => {
            console.log('There was an error retrieving attractions aggregate');
        }
    );
  }

  setGraphData(dataAttractions){
    var labels = [];
    var data = [[]];
    for (var i=0, li=dataAttractions.length; i<li; i++){
         var dataAttraction = dataAttractions[i];
         data[0].push(dataAttraction.waitTimeAvg);
         labels.push(dataAttraction.date);
    }
    
    if(labels.length > 0){
        this.barChartData = data;
        this.barChartLabels = labels;
    }
  }

}
