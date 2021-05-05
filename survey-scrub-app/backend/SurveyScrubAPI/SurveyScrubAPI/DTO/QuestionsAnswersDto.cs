using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class QuestionsAnswersDto
    {
        public string question { get; set; }
        public List<string> answers { get; set; }
    }
}
