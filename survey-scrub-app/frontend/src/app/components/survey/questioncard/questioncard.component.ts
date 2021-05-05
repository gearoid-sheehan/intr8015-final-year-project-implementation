import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyQuestion } from 'src/app/models/surveyQuestion';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-questioncard',
  templateUrl: './questioncard.component.html',
  styleUrls: ['./questioncard.component.scss']
})
export class QuestioncardComponent implements OnInit {

  dataDisplay: any;

  subscription: Subscription;
  public surveyid: string;

  survey: any;

  //Completed Survey to send back
  completedSurvey: Survey = {surveyID: '', surveyName: '', surveyDate: new Date, surveyQuestions: []};

  index = 0;

  questionnumber = 2;
  currentQuestion: any = [];
  surveyForm: FormGroup;

  //Timer variables
  time: number = 0;
  display;
  interval;

  constructor(private surveyService: SurveyService, private alertifyService: AlertifyService, 
              private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { 

                this.surveyForm = this.formBuilder.group({
                  answer: this.formBuilder.array([], [Validators.required])
                })
              }

  ngOnInit(): void {

    this.subscription = this.surveyService.currentSurvey.subscribe(survey => {

    // If Response comes function hideloader() is called 
       if (Response) { 
         this.hideloader(); 
       }

      this.survey = survey;

      this.completedSurvey.surveyName = this.survey.surveyName;
      this.completedSurvey.surveyID = this.survey.surveyId;
      this.completedSurvey.surveyDate = new Date;
  
      this.currentQuestion = this.survey.surveyQuestions[this.questionnumber-1];
      
      //Start timer for beginning of survey
      this.startTimer()

    }, error => {
      this.alertifyService.error(error)
    });
  }

  onCheckboxChange(e) {

    const answer: FormArray = this.surveyForm.get('answer') as FormArray;
    
    if (e.target.checked) {
      answer.push(new FormControl(e.target.value));
    } else {
       const index = answer.controls.findIndex(x => x.value === e.target.value);
       answer.removeAt(index);
    }
  }

  nextQuestion() {

    this.pauseTimer();

    var surveyQuestion: SurveyQuestion = {question: '', answer: '', questionWordCount: 0, time: 0, placing: 1};

    const answer = this.surveyForm.get('answer.' + this.index.toString()).value; 
    console.log(answer);

    this.index++;

    surveyQuestion.question = this.currentQuestion.question;
    console.log(surveyQuestion.question)
    surveyQuestion.time = this.time;
    surveyQuestion.answer = answer;
    surveyQuestion.placing = this.index;
    surveyQuestion.questionWordCount = this.currentQuestion.question.length;

    this.completedSurvey.surveyQuestions.push(surveyQuestion);

    this.time = 0;
    this.startTimer();

    if (this.questionnumber >= this.survey.surveyQuestions.length) {

      console.log(this.completedSurvey)
      this.surveyService.sendSurvey(this.completedSurvey).subscribe(response => {
        
       }, error => {
         this.alertifyService.error(error)
      });

      return this.router.navigateByUrl('/survey/end');
    }

    this.questionnumber++;
    this.currentQuestion = this.survey.surveyQuestions[this.questionnumber-1];
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
    }, 1000);
  }

  transform(value: number): string {
       const minutes: number = Math.floor(value / 60);
       return minutes + ':' + (value - minutes * 60);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  hideloader() { 
    // Setting display of spinner element to none 
    var spinner = document.getElementsByTagName('APP-SPINNER');
    while (spinner[0]) spinner[0].parentNode.removeChild(spinner[0]);
  } 
}