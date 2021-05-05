using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Models
{
    public class SurveyResults
    {
        public Guid InstanceId { get; set; }
        [Key]
        public Guid CompletionInstance { get; set; }
        public Guid SurveyId { get; set; }
        public bool IsFraud { get; set; }

    }
}
