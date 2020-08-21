using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IPostService
    {
        Post GetPost(int id);
        void Add(Post post);
        Task AddReply(PostReply reply);

        IEnumerable<Post> GetAll();
        IEnumerable<Post> GetLatestPosts(int n);

        //IEnumerable<Post> GetFilteredPosts(Forum forum, string searchQuery);
        IEnumerable<Post> GetFilteredPosts(string searchQuery);
    }
}
