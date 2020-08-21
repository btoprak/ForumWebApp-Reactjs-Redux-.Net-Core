using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Post:IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public  ApplicationUser User { get; set; }
        public  Forum Forum { get; set; }

        public  IEnumerable<PostReply> Replies { get; set; }
    }
}
