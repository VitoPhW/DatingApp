using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messagesRepository;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepository, IMessageRepository messagesositorym, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._messagesRepository = messagesositorym;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if(username== createMessageDto.RecipientUsername.ToLower()){
                return BadRequest("You can't send a message to yourself.");
            }

            var sender = await _userRepository.GetUserByUserNameAsync(username);
            var recipient = await _userRepository.GetUserByUserNameAsync(createMessageDto.RecipientUsername);

            if(recipient ==null)
                return NotFound();

            var message = new Message {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messagesRepository.AddMessage(message);

            if(await _messagesRepository.SaveAllAsync())
                return Ok(_mapper.Map<Message>(message));

            return BadRequest("Something went wrong.");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> getMessagesForUser([FromQuery] MessageParams messageParams){
            messageParams.Username = User.GetUsername();
            var messages = await _messagesRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageThread(string username){
            var currentUsername = User.GetUsername();
            var messageThread = await _messagesRepository.GetMessageThread(currentUsername, username);
            return Ok(messageThread);
        }
    }
}