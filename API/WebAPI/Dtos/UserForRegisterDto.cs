using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 10 characters")]
        public string Password { get; set; }

        public DateTime MemberSince { get; set; }

        public UserForRegisterDto()
        {
            MemberSince = DateTime.Now;
        }
    }
}
