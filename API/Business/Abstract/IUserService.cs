using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        IEnumerable<ApplicationUser> GetUsers();
        Task<ApplicationUser> GetUser(string id);
        Task IncrementRating(string id, Type type);
        void Update(ApplicationUser user);
    }
}
