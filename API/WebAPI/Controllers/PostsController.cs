using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Business.Abstract;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IForumService _forumService;
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public PostsController(IPostService postService, IForumService forumService, IUserService userService, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _postService = postService;
            _forumService = forumService;
            _userService = userService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult PostIndex(int id)
        {
            var post = _postService.GetPost(id);

            var postToReturn = _mapper.Map<PostIndexDto>(post);

            var user = post.User;

            var role = _userManager.GetRolesAsync(user).Result;

            postToReturn.User.RoleNames = role;

            foreach (var reply in postToReturn.Replies)
            {
                var replyUserFromDto = reply.User;

                var replyUser = _userManager.FindByIdAsync(replyUserFromDto.Id).Result;

                var replyUserRole = _userManager.GetRolesAsync(replyUser).Result;

                reply.User.RoleNames = replyUserRole;
            }
            return Ok(postToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetLastestPosts")]
        public IActionResult LastestPost()
        {
            var lastestPosts = _postService.GetLatestPosts(10);

            return Ok(lastestPosts);
        }

        [HttpPost]
        public async Task<IActionResult> AddPost(PostCreateDto postCreateDto)
        {
            var userId = _userManager.GetUserId(User);
            var user = _userManager.FindByIdAsync(userId).Result;
            if (userId != (User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            postCreateDto.User = user;


            var post = _mapper.Map<Post>(postCreateDto);
            try
            {
                _postService.Add(post);
                await _userService.IncrementRating(userId, typeof(Post));
                return StatusCode(201);
            }
            catch
            {
                throw new Exception("Creating the post failed on save");
            }
        }

        [AllowAnonymous]
        [HttpGet("searchpost")]
        public IActionResult SearchPost([FromQuery] string searchQuery)
        {
            var posts = _postService.GetFilteredPosts(searchQuery);

            var postsToReturn = _mapper.Map<IEnumerable<PostIndexDto>>(posts);

            return Ok(postsToReturn);
        }
    }
}
