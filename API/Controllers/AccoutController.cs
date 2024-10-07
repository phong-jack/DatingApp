using API.Data;
using API.DTOs;
using API.Entities;
using API.Errors;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccoutController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccoutController(DataContext context, ITokenService tokenService) {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto) {
            if (await UserExist(registerDto.Username)) {
                return BadRequest("Username is taken!");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser()
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto) {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null)
            {
                return Unauthorized("Username not exist");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) {
                    return Unauthorized("Password does not match!");
                }
            }

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            });
        }


        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}
