import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

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
  chartData: any;
  seriesArray: any;

  isBarchart = false;
  isPiechart = false;

  constructor(public surveyService: SurveyService, private alertifyService: AlertifyService,
              public authService: AuthService, public router: Router) {}

  ngOnInit(): void {

    this.surveyService.surveyGet()
      .subscribe((property) => {
        this.survey = property;
        this.survey.surveyURL = environment.surveyURL + '/survey/start/' + this.survey.s3Filename;
      })

    this.getChartData();
    this.showChart('barchart');
  }

  getChartData() {

    this.surveyService.getChartData("8677265b-e4b7-4561-9afa-3eb961665c0a").subscribe(data => {
      this.chartData = data;
    });
  }

  private initializeChartOptionsBarchart() {

    this.seriesArray
    this.chartOptionsBar = {
      seriesBar: [
        {
          name: "Answer One",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Answer Two",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "Answer Three",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "Answer Four",
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
          "Question One",
          "Question Two",
          "Question Three",
          "Question Four",
          "Question Five",
          "Question Six",
          "Question Seven"
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
