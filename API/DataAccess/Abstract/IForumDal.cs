using Core.DataAcccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IForumDal: IEntityRepository<Forum>
    {
        Forum GetById(int id);
        IEnumerable<Forum> GetForums();
        Forum GetForum(int id, string searchQuery);

        IEnumerable<ApplicationUser> GetActiveUsers(int id);
        bool HasRecentPost(int id);
    }
}
