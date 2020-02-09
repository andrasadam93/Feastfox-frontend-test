import { Component, OnInit } from '@angular/core';
import * as data from '../assets/weatherdata.json';
import { GetweatherService } from '../app/getweather.service';
import * as AOS from 'aos';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'weather';
  state = 'current'; // initial state
  importedData = data.query.results.channel; // simplifying data for easier display on the DOM

  constructor(private wService : GetweatherService) {
    console.log(this.importedData);
    // this.getData(); // <-- when the api works
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'High Temperatures' },
    { data: [], label: 'Low Temperatures' },
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Forecast of Low/High Temperatures per Day'
    },
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    }
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    AOS.init({
      duration: 1200,
      delay: 200,
      once: true
    });

    this.importedData.item.forecast.forEach((el) => {
      this.lineChartLabels.push( (el.date + " (" + el.day + ")").toString() );
      this.lineChartData[0].data.push(parseInt(el.high));
      this.lineChartData[1].data.push(parseInt(el.low));
    })
  }

  getEdgeTemp(isLow, item){
    let element = this.importedData.item.forecast.filter( (i) => {return i.code == item.condition.code})[0]
    let temp = isLow ? element.low : element.high;
    return temp;
  }

  getDescriptionIcon(text){
    let iconText;
    switch(text){
      case 'Breezy':
        iconText = "trending_flat";
        break;
      default:
        iconText = 'wb_sunny';
        break;
    }

    return iconText;
  }

  loadedData: any = [];
  getData(){
    this.wService.getWeather().subscribe( data => {
      this.loadedData = data;
      console.log(this.loadedData);
    })
  }
  
}
