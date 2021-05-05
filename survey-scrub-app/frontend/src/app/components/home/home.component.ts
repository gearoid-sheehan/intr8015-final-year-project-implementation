import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

import { faSkull, faCalendarCheck, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //Icons for survey cards
  faSkull = faSkull;
  faCalendarCheck = faCalendarCheck;
  faCalendarTimes = faCalendarTimes;

  searchTitle: string;

  surveys: any = [];
  user: User;

  survey: any;
  subscription: Subscription;

  constructor(private surveyService: SurveyService, private alertifyService: AlertifyService, 
              private authService: AuthService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(x => {
      this.user = x;
    });

    this.subscription = this.surveyService.currentSurvey.subscribe(survey => this.survey = survey);

    this.surveyService.getAllSurveys(this.user.companyId).subscribe(data => {
      this.surveys = data;
      this.surveys.forEach( (element) => {
        //element.startDate = this.survey.startDate.slice(0, -9);
        //element.endDate = this.survey.endDate.slice(0, -9);
    });

    }, error => {
      this.alertifyService.error(error);
    });

  }

  viewSurveyInsights(survey) {
    this.surveyService.loadSurvey(survey);
  }
}
