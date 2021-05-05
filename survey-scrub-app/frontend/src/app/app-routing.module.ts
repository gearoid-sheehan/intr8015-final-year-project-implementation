import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CreatesurveyComponent } from './components/home/createsurvey/createsurvey.component';
import { HomeComponent } from './components/home/home.component';
import { SurveyinsightsComponent } from './components/home/surveyinsights/surveyinsights.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyComponent } from './components/survey/survey.component';
import { QuestioncardComponent } from './components/survey/questioncard/questioncard.component';
import { AuthGuard } from './guards/auth.guard'
import { SurveyendComponent } from './components/survey/surveyend/surveyend.component';

const routes: Routes = [
  { path: '', component: LoginComponent , data: { animation: 'isRight' }},
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard]},
  { path: 'createsurvey', component: CreatesurveyComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard]},
  { path: 'surveyinsights', component: SurveyinsightsComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard]},
  { path: 'survey/start/:surveyid', component: SurveyComponent, data: { animation: 'isRight' }},
  { path: 'survey/complete/:surveyid/:questionnumber', component: QuestioncardComponent },
  { path: 'survey/end', component: SurveyendComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
