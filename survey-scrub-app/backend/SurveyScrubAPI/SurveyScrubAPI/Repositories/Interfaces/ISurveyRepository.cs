using SurveyScrubAPI.DTO;
using SurveyScrubAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Repositories.Interfaces
{
    public interface ISurveyRepository
    {
        Task<bool> CreateNewSurvey(Survey survey);
        Task<IEnumerable<Survey>> GetAllSurveys(Guid companyId);
        Task<Survey> GetSurvey(Guid surveyId);
        Task<Survey> DeleteSurvey(Guid surveyId);
        Task<int> SaveSurveyResults(SurveyResults surveyResults);
        Task<int> SaveSurveyQuestionResults(SurveyQuestionResults surveyResults);
    }
}
