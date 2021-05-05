using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyScrubAPI.Models
{
    public class User
    {
        [Key]
        public Guid InstanceId { get; set; }
        [ForeignKey("CompanyId")]
        public Guid CompanyId { get; set; }
        public string FirstName { get; set; }
        public string LastName{ get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string Sector { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
