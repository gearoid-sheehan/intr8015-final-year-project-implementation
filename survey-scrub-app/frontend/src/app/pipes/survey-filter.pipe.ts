import { Pipe, PipeTransform } from '@angular/core';
import { Survey } from '../models/survey';

@Pipe({
  name: 'surveyFilter'
})
export class SurveyFilterPipe implements PipeTransform {

  transform(surveys: Survey[], searchTitle: string): Survey[] {
    if (!surveys || !searchTitle) {
      return surveys;
    }

    return surveys.filter(surveys =>
      surveys.surveyName.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1);
  }
}
