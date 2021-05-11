import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  baseUrl = environment.apiEndpoint + '/Survey';

  private surveySource = new BehaviorSubject('Default');
  currentSurvey = this.surveySource.asObservable();

  constructor(private http: HttpClient) {
    let storedProp = localStorage.getItem('current_survey');
    if (storedProp)
        this.loadSurvey(JSON.parse(storedProp), false);
   }

  uploadSurvey(formData: FormData) {
    return this.http.post(this.baseUrl + '/createnewsurvey', formData);
  }

  getAllSurveys(companyId) {
    return this.http.get(this.baseUrl + '/getallsurveys/' + companyId);
  }

  loadSurvey(survey: any, storeProp: boolean = false) {
    if (storeProp)
      localStorage.set('current_survey', JSON.stringify(survey));
    this.surveySource.next(survey);
  }

  surveyGet() {
    return this.surveySource;
  }

  deleteSurvey(surveyid) {
    console.log(surveyid)
    return this.http.get(this.baseUrl + '/deletesurvey/' + surveyid);
  }

  getSurvey(surveyid) {
    return this.http.get(this.baseUrl + '/getsurvey/' + surveyid);
  }

  //Sends survey completed by a user to the backend for processing
  sendSurvey(completedSurvey: Survey) {
    return this.http.post(this.baseUrl + '/postsurvey', completedSurvey);
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
