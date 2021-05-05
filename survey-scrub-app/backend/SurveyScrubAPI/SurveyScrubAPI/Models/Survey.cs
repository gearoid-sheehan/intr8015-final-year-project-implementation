using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Models
{
    public class Survey
    {
        [Key]
        public Guid InstanceId { get; set; }
        public Guid CompanyId { get; set; }
        public string SurveyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid S3Filename { get; set; }
        public string SurveyDescription { get; set; }
        public int FraudRate { get; set; }
    }
}
