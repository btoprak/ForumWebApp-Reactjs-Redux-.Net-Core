using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class ForumListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string ImageUrl { get; set; }
        public int NumberOfUsers { get; set; }
        public bool HasRecentPost { get; set; }


        public ICollection<PostListDto> Posts { get; set; }
    }
}
