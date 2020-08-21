using AutoMapper;
using Business.Concrete;
using Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    { 
        public AutoMapperProfiles()
        {
            CreateMap<ApplicationUser, UserForListDto>();
            CreateMap<UserForRegisterDto, ApplicationUser>();
            CreateMap<Forum, ForumTopicList>();
            CreateMap<Forum, ForumListDto>();
            CreateMap<ForumCreateDto, Forum>();
            CreateMap<Post, PostListDto>();
            CreateMap<PostReply, PostReplyDto>();
            CreateMap<Post, PostIndexDto>();
            CreateMap<PostCreateDto, Post>();
            CreateMap<PostReplyCreateDto, PostReply>();
            CreateMap<ApplicationUser, UserForListDto>();
            CreateMap<ApplicationUser, UserProfileDto>();
        }
    }

   
}
