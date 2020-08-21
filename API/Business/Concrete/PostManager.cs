using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class PostManager : IPostService
    {
        private readonly IPostDal _postDal;
        public PostManager(IPostDal postDal)
        {
            _postDal = postDal;
        }

        public void Add(Post post)
        {
            _postDal.Add(post);
        }

        public Task AddReply(PostReply reply)
        {
            return _postDal.AddReply(reply);
        }

        public IEnumerable<Post> GetAll()
        {
            throw new NotImplementedException();
        }

        //public IEnumerable<Post> GetFilteredPosts(Forum forum, string searchQuery)
        //{
        //    return _postDal.GetFilteredPosts(forum, searchQuery);
        //}

        public IEnumerable<Post> GetFilteredPosts(string searchQuery)
        {
            return _postDal.GetFilteredPosts(searchQuery);
        }

        public IEnumerable<Post> GetLatestPosts(int n)
        {
            return _postDal.GetLatestPosts(n);
        }

        public Post GetPost(int id)
        {
            return _postDal.GetPost(id);
        }
    }
}
