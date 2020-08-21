using Core.DataAcccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IUserDal : IEntityRepository<ApplicationUser>
    {
        Task<ApplicationUser> GetUser(string id);
        Task IncrementRating(string id, Type type);
    }
}
