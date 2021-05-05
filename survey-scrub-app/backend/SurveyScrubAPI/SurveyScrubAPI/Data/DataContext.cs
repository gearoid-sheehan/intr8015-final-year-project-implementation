using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SurveyScrubAPI.Models;

namespace SurveyScrubAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<SurveyResults> SurveyResults { get; set; }
        public DbSet<SurveyQuestionResults> SurveyQuestionResults { get; set; }
    }
}
