﻿using Business.Abstract;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;


namespace WebAPI.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (resultContext.HttpContext.User.Identity.Name != null)
            {
                var userId = resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var repo = resultContext.HttpContext.RequestServices.GetService<IUserService>();
                var user = await repo.GetUser(userId);
                user.LastActive = DateTime.Now;

                repo.Update(user);
            }
        }
    }
}
