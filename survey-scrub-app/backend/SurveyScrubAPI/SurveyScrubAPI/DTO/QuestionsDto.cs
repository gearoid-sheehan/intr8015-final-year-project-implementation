using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class QuestionsDto
    {
        public string surveyId { get; set; }
        public string surveyName { get; set; }
        public string surveyDescription { get; set; }
        public DateTime endDate { get; set; }
        public List<QuestionsAnswersDto> surveyQuestions { get; set; }

    }
}
