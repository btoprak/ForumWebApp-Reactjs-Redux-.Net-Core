using Core.DataAcccess.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.Context;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfCorePostDal : EfEntityRepositoryBase<Post, ForumContext>, IPostDal
    {
        private readonly ForumContext _context;
        public EfCorePostDal(ForumContext context)
        {
            _context = context;
        }

        public async Task AddReply(PostReply reply)
        {
            _context.PostReplies.Add(reply);
            await _context.SaveChangesAsync();
        }

        //public IEnumerable<Post> GetFilteredPosts(Forum forum, string searchQuery)
        //{
        //    return string.IsNullOrEmpty(searchQuery) ?
        //       forum.Posts : forum.Posts.
        //       Where(post => post.Title.Contains(searchQuery) || post.Content.Contains(searchQuery));
        //}

        public IEnumerable<Post> GetFilteredPosts(string searchQuery)
        {
           var posts= _context.Posts
                .Include(post => post.User)
                .Include(post => post.Replies).ThenInclude(reply => reply.User)
                .Include(post => post.Forum);

            return string.IsNullOrEmpty(searchQuery) ?
                posts.ToList()
                :posts.Where(p => p.Title.ToLower().Contains(searchQuery.ToLower())
                                || p.Content.ToLower().Contains(searchQuery.ToLower())).OrderByDescending(p => p.Created).ToList();
        }

        public IEnumerable<Post> GetLatestPosts(int n)
        {
            var posts = _context.Posts
                .Include(post => post.User)
                .Include(post => post.Replies).ThenInclude(reply => reply.User)
                .Include(post => post.Forum);

            return posts.OrderByDescending(post => post.Created).Take(n).ToList();
        }

        public Post GetPost(int id)
        {
            return _context.Posts.Where(post => post.Id == id)
                .Include(post => post.User)
                .Include(post => post.Replies).ThenInclude(reply => reply.User)
                .Include(post => post.Forum)
                .First();
        }
    }
}
