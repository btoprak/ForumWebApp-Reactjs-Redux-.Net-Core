using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class PostIndexDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public  UserForListDto User { get; set; }
        public ForumTopicList Forum { get; set; }

        public  IEnumerable<PostReplyDto> Replies { get; set; }
    }
}
