import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.scss']
})
export class CreatesurveyComponent implements OnInit {

  survey: any = {};
  companyId: string;

  createSurveyForm: FormGroup;

  constructor(private surveyService: SurveyService, private formBuilder: FormBuilder, private alertifyService: AlertifyService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createSurveyForm = this.formBuilder.group({
      surveyName: ['', [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
      surveyDescription: ['', [
        Validators.required
      ]],
      allowedFraudRate: [0, [
        Validators.required
      ]],
      fileUpload: [null, [
        Validators.required
      ]],
      agree: [false, [
        Validators.requiredTrue
      ]]
    })

    this.authService.currentUser$.subscribe(x => {
      this.companyId = x.companyId;
    })
  }

  get surveyName() {
    return this.createSurveyForm.get('surveyName')
  }

  get startDate() {
    return this.createSurveyForm.get('startDate')
  }

  get endDate() {
    return this.createSurveyForm.get('endDate')
  }

  get surveyDescription() {
    return this.createSurveyForm.get('surveyDescription')
  }

  get allowedFraudRate() {
    return this.createSurveyForm.get('allowedFraudRate')
  }

  get fileUpload() {
    return this.createSurveyForm.get('fileUpload')
  }

  get agree() {
    return this.createSurveyForm.get('agree')
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createSurveyForm.get('fileUpload').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('surveyName', this.createSurveyForm.get('surveyName').value);
    formData.append('startDate', this.createSurveyForm.get('startDate').value);
    formData.append('endDate', this.createSurveyForm.get('endDate').value);
    formData.append('surveyDescription', this.createSurveyForm.get('surveyDescription').value);
    formData.append('allowedFraudRate', this.createSurveyForm.get('allowedFraudRate').value);
    formData.append('file', this.createSurveyForm.get('fileUpload').value);
    formData.append('companyId', this.companyId);

    this.surveyService.uploadSurvey(formData).subscribe(data => {
      // do something, if upload success
      this.router.navigate(['/home']);
      this.alertifyService.success("Survey Created");
      }, error => {
        this.alertifyService.error("Failed to Create Survey");
      });
  }
}
