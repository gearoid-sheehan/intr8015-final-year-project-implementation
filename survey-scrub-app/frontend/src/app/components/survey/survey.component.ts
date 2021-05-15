import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  dataDisplay: any;

  public surveyid: string;
  survey: any;

  tcForm: FormGroup;

  constructor(private surveyService: SurveyService, private alertifyService: AlertifyService,
              private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.tcForm = this.formBuilder.group({
      acceptTerms: [false,
        Validators.requiredTrue]
    })

    //Retrieves surveyid from the given url
    this.surveyid = this.route.snapshot.paramMap.get("surveyid");

    this.surveyService.getSurvey(this.surveyid).subscribe(Response => {

      // If Response comes function hideloader() is called
      if (Response) {
        this.hideloader();
      }

      this.survey = Response;
      this.dataDisplay = this.survey.data;
      this.survey = Response;

    }, error => {
        this.alertifyService.error(error);
      });
  }

  get acceptTerms() {
    return this.tcForm.get('acceptTerms')
  }

  beginSurvey(survey) {
    this.surveyService.loadSurvey(survey);
  }

  hideloader() {
    // Setting display of spinner element to none
    var spinner = document.getElementsByTagName('APP-SPINNER');
    while (spinner[0]) spinner[0].parentNode.removeChild(spinner[0]);
  }
}
