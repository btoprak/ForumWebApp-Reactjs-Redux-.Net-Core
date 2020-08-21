using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class PostReply
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public  ApplicationUser User { get; set; }
        public  Post Post { get; set; }
    }
}
