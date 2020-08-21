using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Business.Abstract;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepliesController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public RepliesController(IPostService postService, IUserService userService, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _postService = postService;
            _userService = userService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddReply(PostReplyCreateDto postReplyCreateDto)
        {
            var userId = _userManager.GetUserId(User);
            var user = await _userManager.FindByIdAsync(userId);

            if (userId != (User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var post = _postService.GetPost(postReplyCreateDto.PostId);

            postReplyCreateDto.User = user;
            postReplyCreateDto.Post = post;

            var postreply = _mapper.Map<PostReply>(postReplyCreateDto);

            try
            {
                await _postService.AddReply(postreply);
                await _userService.IncrementRating(userId, typeof(PostReply));
                return StatusCode(201);
            }
            catch
            {
                throw new Exception("Creating the postreply failed on save");
            }
        }

    }
}
