using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        private readonly IUserDal _userDal;
        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        public IEnumerable<ApplicationUser> GetUsers()
        {
            return _userDal.GetList();
        }

        public Task IncrementRating(string id, Type type)
        {
            return _userDal.IncrementRating(id, type);
        }

        public void Update(ApplicationUser user)
        {
            _userDal.Update(user);
        }

        Task<ApplicationUser> IUserService.GetUser(string id)
        {
            return _userDal.GetUser(id);
        }
    }
}
