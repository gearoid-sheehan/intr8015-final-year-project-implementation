using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class StackedChartData
    {
        public List<string> catagories { get; set; }
        public List<BarData> barData { get; set; }

        public class BarData
        {
            public string answer { get; set; }
            public List<int> data { get; set; }
        }
    }
}
