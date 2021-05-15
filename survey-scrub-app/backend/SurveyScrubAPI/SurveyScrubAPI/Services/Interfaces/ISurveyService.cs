using Microsoft.AspNetCore.Mvc;
using SurveyScrubAPI.DTO;
using SurveyScrubAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Services.Interfaces
{
    public interface ISurveyService
    {
        Task<bool> CreateNewSurvey(SurveyDto surveyDto);
        Task<IEnumerable<Survey>> GetAllSurveys(Guid companyId);
        Task<QuestionsDto> GetSurvey(Guid companyId);
        Task<QuestionsDto> PostSurvey(CompletedSurveyDto completedSurvey);
        Task<StackedChartData> GetChartData(Guid surveyId);
    }
}
