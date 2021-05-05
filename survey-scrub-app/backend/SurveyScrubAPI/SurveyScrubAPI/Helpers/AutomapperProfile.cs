using AutoMapper;
using SurveyScrubAPI.DTO;
using SurveyScrubAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Helpers
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Survey, SurveyDto>().ForMember(dest => dest.file, act => act.Ignore());
        }
    }
}
