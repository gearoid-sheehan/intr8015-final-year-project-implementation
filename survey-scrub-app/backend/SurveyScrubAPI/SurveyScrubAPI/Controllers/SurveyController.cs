using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyScrubAPI.DTO;
using SurveyScrubAPI.Models;
using SurveyScrubAPI.Repositories.Interfaces;
using SurveyScrubAPI.Services.Interfaces;

namespace SurveyScrubAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService _surveyService;
        private readonly ISurveyRepository _surveyRepository;

        public SurveyController(ISurveyService surveyService, ISurveyRepository surveyRepository)
        {
            _surveyService = surveyService;
            _surveyRepository = surveyRepository;
        }

        // Create a new Survey
        [HttpPost("createnewsurvey")]
        public async Task<IActionResult> CreateNewSurvey([FromForm] SurveyDto surveyDto)
        {
            await _surveyService.CreateNewSurvey(surveyDto);
            return Ok();
        }

        // Get list of all a users surveys
        [HttpGet("getallsurveys/{companyid}")]
        public async Task<IEnumerable<Survey>> GetAllSurveys(Guid companyId)
        {
            var listOfSurveys = await _surveyService.GetAllSurveys(companyId);
            return listOfSurveys;
        }

        [HttpGet("getsurvey/{surveyid}")]
        public async Task<QuestionsDto> GetSurvey(Guid surveyId)
        {
            var survey = await _surveyService.GetSurvey(surveyId);
            return survey;
        }

        // Delete a Survey
        [HttpPost("postsurvey")]
        public async Task<ActionResult> PostSurvey(CompletedSurveyDto completedSurvey)
        {
            await _surveyService.PostSurvey(completedSurvey);
            return Ok();
        }

        // Delete a Survey
        [HttpGet("deletesurvey/{surveyid}")]
        public async Task<ActionResult> DeleteSurvey(Guid surveyId)
        {
            await _surveyRepository.DeleteSurvey(surveyId);
            return Ok();
        }
    }
}
