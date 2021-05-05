using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyScrubAPI.Data;
using SurveyScrubAPI.Models;
using SurveyScrubAPI.Repositories.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Repositories.Concrete_Classes
{
    public class SurveyRepository : ISurveyRepository
    {
        private readonly DataContext _dataContext;
        public SurveyRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<bool> CreateNewSurvey(Survey survey)
        {
            _dataContext.Surveys.Add(survey);
            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Survey>> GetAllSurveys(Guid companyId)
        {
            var listOfSurveys = await _dataContext.Surveys.Where(x => x.CompanyId == companyId).ToListAsync();

            return listOfSurveys;
        }

        public async Task<Survey> GetSurvey(Guid surveyId)
        {
            var survey = await _dataContext.Surveys.Where(x => x.S3Filename == surveyId).FirstOrDefaultAsync();

            return survey;
        }

        public async Task<Survey> DeleteSurvey(Guid surveyId)
        {
            var survey = await _dataContext.Surveys.FirstOrDefaultAsync(x => x.InstanceId == surveyId);

            if (survey != null)
            {
                _dataContext.Surveys.Remove(survey);
                await _dataContext.SaveChangesAsync();
            }

            return survey;
        }

        public async Task<int> SaveSurveyQuestionResults(SurveyQuestionResults surveyQuestionResults)
        {
            _dataContext.SurveyQuestionResults.Add(surveyQuestionResults);

            return await _dataContext.SaveChangesAsync();
        }

        public async Task<int> SaveSurveyResults(SurveyResults surveyResults)
        {
            _dataContext.SurveyResults.Add(surveyResults);

            var surveys = (from x in _dataContext.SurveyResults where x.SurveyId.Equals(surveyResults.SurveyId) select x).ToList();

            var fradulentSurveys = (from x in surveys where x.IsFraud.Equals(true) select x).Count();

            var surveyToUpdate = _dataContext.Surveys.SingleOrDefault(b => b.S3Filename == surveyResults.SurveyId);
            surveyToUpdate.FraudRate = fradulentSurveys / surveys.Count();

            return await _dataContext.SaveChangesAsync();
        }
    }
}
