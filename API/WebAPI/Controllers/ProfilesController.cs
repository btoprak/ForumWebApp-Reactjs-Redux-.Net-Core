using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ProfilesController(UserManager<ApplicationUser> userManager, IUserService userService, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult UserDetail(string id)
        {
            var user = _userManager.FindByIdAsync(id).Result;
            var userRoles = _userManager.GetRolesAsync(user).Result;

            var userToReturn = _mapper.Map<UserProfileDto>(user);

            userToReturn.RoleNames = userRoles;

            return Ok(userToReturn);

        }

        [HttpPost]
        public IActionResult UploadProfileImage(IFormFile file)
        {
            var userId = _userManager.GetUserId(User);
            var user = _userService.GetUser(userId).Result;

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

            user.ProfileImageUrl = uploadResult.Url.ToString();

            try
            {
                _userService.Update(user);
                return StatusCode(201);
            }
            catch
            {
                throw new Exception("Updating the user failed on save");
            }
        }
    }
}
