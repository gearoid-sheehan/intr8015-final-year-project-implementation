import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

import { AlertifyService } from 'src/app/services/alertify.service';
import { SurveyService } from 'src/app/services/survey.service';
import { faSkull, faCalendarCheck, faCalendarTimes, faHourglassHalf, faLink } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

export type ChartOptions = {

  // Bar chart
  seriesBar: ApexAxisChartSeries;
  chartBar: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsiveBar: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;

  // Pie Chart
  seriesPie: ApexNonAxisChartSeries;
  chartPie: ApexChart;
  responsivePie: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-surveyinsights',
  templateUrl: './surveyinsights.component.html',
  styleUrls: ['./surveyinsights.component.scss']
})
export class SurveyinsightsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsBar: Partial<ChartOptions>;
  public chartOptionsPie: Partial<ChartOptions>;

  //Icons
  faSkull = faSkull;
  faCalendarCheck = faCalendarCheck;
  faCalendarTimes = faCalendarTimes;
  faHourglassHalf = faHourglassHalf;
  faLink = faLink;

  survey: any;

  isBarchart = false;
  isPiechart = false;

  constructor(public surveyService: SurveyService, private alertifyService: AlertifyService,
              public authService: AuthService, public router: Router) {}

  ngOnInit(): void {

    this.surveyService.surveyGet()
      .subscribe((property) => {
        this.survey = property;
      })

    this.showChart('barchart');
  }

  private initializeChartOptionsBarchart() {

    this.chartOptionsBar = {
      seriesBar: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chartBar: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsiveBar: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }

  private initializeChartOptionsPiechart() {
    this.chartOptionsPie = {
      seriesPie: [44, 55, 13, 43, 22],
      chartPie: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsivePie: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  showChart(chart) {

    if (chart == "barchart") {
      this.isPiechart = false;
      this.isBarchart = true;
      this.initializeChartOptionsBarchart();

    } else if (chart == "piechart") {
      this.isBarchart = false;
      this.isPiechart = true;
      this.initializeChartOptionsPiechart();

    } else if (chart == "piechart") {
      this.isBarchart = false;
      this.isPiechart = true;
      this.initializeChartOptionsPiechart();
    }
  }
}
