using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class ProcessedQuestions
    {
        public int datetime { get; set; }
        public int is_fraud { get; set; }
        public int length_time { get; set; }
        public int placing { get; set; }
        public int q_word_count { get; set; }
    }
}
