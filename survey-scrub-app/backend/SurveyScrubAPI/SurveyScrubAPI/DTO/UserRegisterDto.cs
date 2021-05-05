using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.DTO
{
    public class UserRegisterDto
    {
        //[Required]
        public string FirstName { get; set; }
        //[Required]
        public string LastName { get; set; }
        //[Required]
        public string Email { get; set; }
        //[Required]
        public string CompanyName { get; set; }
        //[Required]
        public string Sector { get; set; }
        //[Required]
        //[StringLength(16, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 16 characters")]
        public string Password { get; set; }
    }
}
