using Core.DataAcccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IPostDal: IEntityRepository<Post>
    {
        Post GetPost(int id);
        Task AddReply(PostReply reply);

        IEnumerable<Post> GetLatestPosts(int n);

        //IEnumerable<Post> GetFilteredPosts(Forum forum, string searchQuery);
        IEnumerable<Post> GetFilteredPosts(string searchQuery);
    }
}
