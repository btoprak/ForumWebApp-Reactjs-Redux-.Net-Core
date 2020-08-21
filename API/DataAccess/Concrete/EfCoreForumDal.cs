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
    public class EfCoreForumDal : EfEntityRepositoryBase<Forum, ForumContext>, IForumDal
    {
        private readonly ForumContext _context;
        public EfCoreForumDal(ForumContext context)
        {
            _context = context;
        }

        public IEnumerable<ApplicationUser> GetActiveUsers(int id)
        {
            var posts = GetById(id).Posts;

            if (posts != null || !posts.Any())
            {
                var postUsers = posts.Select(p => p.User);
                var replyUsers = posts.SelectMany(p => p.Replies).Select(r => r.User);
                return postUsers.Union(replyUsers).Distinct();
            }

            return new List<ApplicationUser>();
        }

        public Forum GetById(int id)
        {
            var forum = _context.Forums.Where(f => f.Id == id)
                .Include(f => f.Posts).ThenInclude(p => p.User)
                .Include(f => f.Posts).ThenInclude(p => p.Replies).ThenInclude(r => r.User)
                .FirstOrDefault();

            return forum;
        }

        public Forum GetForum(int id, string searchQuery)
        {
            var forum = _context.Forums.Where(f => f.Id == id)
                .Include(f => f.Posts).ThenInclude(p=>p.User)
                .Include(f=>f.Posts).ThenInclude(p => p.Replies).ThenInclude(p => p.User).FirstOrDefault();

            forum.Posts = string.IsNullOrEmpty(searchQuery) ?
                forum.Posts.OrderByDescending(p => p.Created).ToList()
                : forum.Posts.Where(p => p.Title.ToLower().Contains(searchQuery.ToLower()) 
                                || p.Content.ToLower().Contains(searchQuery.ToLower())).OrderByDescending(p => p.Created).ToList();

            return forum;
        }

        public IEnumerable<Forum> GetForums()
        {
            return _context.Forums.Include(forum => forum.Posts).ToList();
        }

        public bool HasRecentPost(int id)
        {
            const int hoursAgo = 12;
            var window = DateTime.Now.AddHours(-hoursAgo);
            return GetById(id).Posts.Any(post => post.Created > window);
        }
    }
}
