using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ForumManager : IForumService
    {
        private readonly IForumDal _forumDal;

        public ForumManager(IForumDal forumDal)
        {
            _forumDal = forumDal;
        }

        public void Add(Forum forum)
        {
            _forumDal.Add(forum);
        }

        public void Delete(Forum forum)
        {
            _forumDal.Delete(forum);
        }

        public IEnumerable<ApplicationUser> GetActiveUsers(int id)
        {
            return _forumDal.GetActiveUsers(id);
        }

        public Forum GetById(int id)
        {
            return _forumDal.GetById(id);
        }

        public Forum GetForum(int id, string searchQuery)
        {
            return _forumDal.GetForum(id,searchQuery);
        }

        public IEnumerable<Forum> GetForums()
        {
            return _forumDal.GetForums();
        }

        public bool HasRecentPost(int id)
        {
            return _forumDal.HasRecentPost(id);
        }

        public void Update(Forum forum)
        {
            _forumDal.Update(forum);
        }
    }
}
