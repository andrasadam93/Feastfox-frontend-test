import { Component, OnInit } from '@angular/core';
import * as data from '../assets/weatherdata.json';
import { GetweatherService } from '../app/getweather.service';
import * as AOS from 'aos';
import { ChartDataSets, ChartOptions } from 'chart.js';

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
    // this.getData(); // <-- when the api oauth works
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'High Temperatures' },
    { data: [], label: 'Low Temperatures' },
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
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
    },
    legend :{
      labels :{
        fontSize: 9,
      }
    }
    /*
    tooltips:{
      // Disable the on-canvas tooltip
      enabled: false,

      custom: function(tooltipModel) {
          // Tooltip Element
          console.log(tooltipModel);
          var tooltipEl = document.getElementById('chartjs-tooltip');

          // Create element on first render
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
              //tooltipEl.style.opacity = 0;
              return;
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
              tooltipEl.classList.add('no-transform');
          }

          function getBody(bodyItem) {
              return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = '<thead>';

              titleLines.forEach(function(title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                  var colors = tooltipModel.labelColors[i];
                  var style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  var span = '<span style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
          }

          // `this` will be the overall tooltip
          var position = this._chart.canvas.getBoundingClientRect();

          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          tooltipEl.style.pointerEvents = 'none';
      }
    }*/
  };

  public lineChartLegend = true;
  public lineChartType = 'line';
  public chartHovered = (event) => {
    // tooltip might be possible to modify from here with a workaround
  }

  ngOnInit() {
    AOS.init({
      duration: 1200,
      delay: 200,
      once: true
    });

    this.importedData.item.forecast.forEach((el,index) => {
      if(index > 6) return false; // we only need 7 data entries for the week <-- here we could inject a navigator, an on-click event that handles this stoppage
      this.lineChartLabels.push( (el.date + " (" + el.day + ")").toString() );
      this.lineChartData[0].data.push(parseInt(el.high));
      this.lineChartData[1].data.push(parseInt(el.low));
    })
  }

  getEdgeTemp(isLow, item){
    // this is to showcase a 'calculated' data display
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
        // we could add more description-icon pairs
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
