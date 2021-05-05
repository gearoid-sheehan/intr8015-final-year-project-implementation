using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Models
{
    public class SurveyQuestionResults
    {
        [Key]
        public Guid InstanceId { get; set; }
        public Guid SurveyId { get; set; }
        public Guid CompletionInstance { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public DateTime Datetime { get; set; }
        public int Time { get; set; }
        public int Placing { get; set; }
        public int QuestionWordCount { get; set; }
        public bool IsFraud { get; set; }
    }
}
