using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class AnsweredQuestions
    {
        public string question { get; set; }
        public List<CountedAnswers> countedAnswers { get; set; }

        public class CountedAnswers
        {
            public string answer { get; set; }
            public int count { get; set; }
        }
    }
}
