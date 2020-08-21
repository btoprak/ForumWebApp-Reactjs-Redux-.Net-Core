using Core.DataAcccess.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.Context;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfCoreUserDal : EfEntityRepositoryBase<ApplicationUser, ForumContext>, IUserDal
    {
        private readonly ForumContext _context;
        public EfCoreUserDal(ForumContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser> GetUser(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;

        }

        public async Task IncrementRating(string id, Type type)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Id==id);
            var newRating = CalculateUserRating(type, user.Rating);
            user.Rating += newRating;
            await _context.SaveChangesAsync();
        }

        private int CalculateUserRating(Type type, int userRating)
        {
            var inc = 0;
            if (type == typeof(Post))
            {
                inc = 1;
            }

            if (type == typeof(PostReply))
            {
                inc = 3;
            }
            return userRating = inc;
        }
    }
}
