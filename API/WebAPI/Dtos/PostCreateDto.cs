using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class PostCreateDto
    {

        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public ApplicationUser User { get; set; }
        public ForumTopicList Forum { get; set; }

        public PostCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}
