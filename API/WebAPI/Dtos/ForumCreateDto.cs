using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class ForumCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string ImageUrl { get; set; }
        public IFormFile File { get; set; }

        public ForumCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}
