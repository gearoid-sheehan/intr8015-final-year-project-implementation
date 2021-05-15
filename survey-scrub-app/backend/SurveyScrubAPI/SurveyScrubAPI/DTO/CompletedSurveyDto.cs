using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class CompletedSurveyDto
    {
        public Guid surveyId { get; set; }
        public DateTime surveyDate { get; set; }
        public int allowedFraudRate { get; set; }
        public string surveyName { get; set; }
        public List<CompletedQuestions> surveyQuestions { get; set; }

        public class CompletedQuestions
        {
            public string question { get; set; }
            public string answer { get; set; }
            public DateTime datetime { get; set; }
            public int time { get; set; }
            public int placing { get; set; }
            public int questionWordCount { get; set; }
        }
      
    }
}
