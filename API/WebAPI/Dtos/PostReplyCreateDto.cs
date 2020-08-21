using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class PostReplyCreateDto
    {
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int PostId { get; set; }

        public ApplicationUser User { get; set; }
        public Post Post { get; set; }

        public PostReplyCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}
