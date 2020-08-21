using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IForumService
    {
        void Add(Forum forum);
        void Update(Forum forum);
        void Delete(Forum forum);
        Forum GetById(int id);
        IEnumerable<Forum> GetForums();
        Forum GetForum(int id,string searchQuery);

        IEnumerable<ApplicationUser> GetActiveUsers(int id);
        bool HasRecentPost(int id);
    }
}
