using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class SurveyDto
    {
        public string surveyName { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public bool isProtected { get; set; }
        public IFormFile file { get; set; }
        public string companyId { get; set; }
        public string surveyDescription { get; set; }
    }
}
