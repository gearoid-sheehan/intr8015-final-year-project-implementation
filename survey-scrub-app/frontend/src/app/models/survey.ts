import { SurveyQuestion } from "./surveyQuestion";

export interface Survey {
    surveyID: string;
    surveyName: string;
    surveyDate: Date;
    surveyQuestions: SurveyQuestion[];
}
