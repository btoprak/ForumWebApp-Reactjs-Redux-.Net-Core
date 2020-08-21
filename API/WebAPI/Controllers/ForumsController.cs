using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Business.Abstract;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebAPI.Dtos;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class ForumsController : ControllerBase
    {
        private readonly IForumService _forumService;
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ForumsController(IForumService forumService, IUserService userService, UserManager<ApplicationUser> userManager, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _forumService = forumService;
            _userService = userService;
            _userManager = userManager;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetForums()
        {
            var forums = _forumService.GetForums();

            var forumToReturn = _mapper.Map<IEnumerable<ForumListDto>>(forums);

            foreach (var forum in forumToReturn)
            {
                forum.NumberOfUsers = _forumService.GetActiveUsers(forum.Id).Count();
                forum.HasRecentPost = _forumService.HasRecentPost(forum.Id);
            }

            return Ok(forumToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetForum(int id, [FromQuery] string searchQuery)
        {
            var forum = _forumService.GetForum(id, searchQuery);

            var forumToReturn = _mapper.Map<ForumTopicList>(forum);

            return Ok(forumToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public IActionResult AddForum([FromForm] ForumCreateDto forumCreateDto)
        {

            var file = forumCreateDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            forumCreateDto.ImageUrl = uploadResult.Url.ToString();

            var forum = _mapper.Map<Forum>(forumCreateDto);

            try
            {
                _forumService.Add(forum);
                return StatusCode(201);
            }
            catch
            {
                throw new Exception("Creating the post failed on save");
            }
        }
    }
}
