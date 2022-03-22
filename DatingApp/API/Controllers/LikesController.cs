using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikeRepository _likeRepository;

        public LikesController(IUserRepository userRepository, ILikeRepository likeRepositor)
        {
            this._userRepository = userRepository;
            this._likeRepository = likeRepositor;
        }
        [HttpPost("{username}")] //POST: .api/likes/{username}
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUserNameAsync(username);
            var sourceUser = await _likeRepository.GetUserWithLikes(sourceUserId);

            if(likedUser == null) return NotFound();

            if(sourceUser.UserName == username) return BadRequest("U cannot like your self.");

            var userLike = await _likeRepository.GetUserLike(sourceUserId, likedUser.Id);
            if(userLike != null) return BadRequest("U already like this user.");

            sourceUser.LikedUsers = sourceUser.LikedUsers == null ? new List<UserLike>() : sourceUser.LikedUsers; // check the new version on GitHub of Tzanhani

            userLike = new UserLike {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if(await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to like user.");
        }

        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likeRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}