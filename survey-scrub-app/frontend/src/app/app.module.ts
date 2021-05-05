import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreatesurveyComponent } from './components/home/createsurvey/createsurvey.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { SurveyinsightsComponent } from './components/home/surveyinsights/surveyinsights.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SurveyComponent } from './components/survey/survey.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { SurveyFilterPipe } from './pipes/survey-filter.pipe';
import { QuestioncardComponent } from './components/survey/questioncard/questioncard.component';
import { SurveyendComponent } from './components/survey/surveyend/surveyend.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    RegisterComponent,
    HomeComponent,
    CreatesurveyComponent,
    SettingsComponent,
    SurveyinsightsComponent,
    NavbarComponent,
    SurveyComponent,
    SpinnerComponent,
    CountdownComponent,
    SurveyFilterPipe,
    QuestioncardComponent,
    SurveyendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
