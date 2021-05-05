import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts/lib/model/apex-types';

import { AlertifyService } from 'src/app/services/alertify.service';
import { SurveyService } from 'src/app/services/survey.service';
import { faSkull, faCalendarCheck, faCalendarTimes, faHourglassHalf, faLink } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-surveyinsights',
  templateUrl: './surveyinsights.component.html',
  styleUrls: ['./surveyinsights.component.scss']
})
export class SurveyinsightsComponent implements OnInit {
  
  //Icons
  faSkull = faSkull;
  faCalendarCheck = faCalendarCheck;
  faCalendarTimes = faCalendarTimes;
  faHourglassHalf = faHourglassHalf;
  faLink = faLink;

  survey: any;

  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;

  constructor(public surveyService: SurveyService, private modalService: NgbModal, private alertifyService: AlertifyService, 
              public authService: AuthService, public router: Router) { }

  ngOnInit(): void {

    this.surveyService.surveyGet()
      .subscribe((property) => {
        this.survey = property;
      })

    this.initializeChartOptions()
  }

  confirmDeleteModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  deleteSurvey() {

    this.surveyService.deleteSurvey(this.survey.instanceId).subscribe(data => {

      this.router.navigate(['/home']);
      this.alertifyService.success("Survey Deleted");
    }, error => {
      this.alertifyService.error("Failed to Delete Survey");
    });
  }

  private initializeChartOptions() {
    this.title = {
      text: 'Survey Performance'
    };

    this.series = [{
      name: 'Engagements',
      data: [12, 23, 44]
    }];

    this.chart = {
      type: 'bar',
      width: 690,
      height: 400
    };
  }
}
