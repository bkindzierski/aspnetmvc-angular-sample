using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace aspnetmvc_angular_sample.Models
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseViewModel : IdentityUser
    {
        public TokenResponseViewModel()
        {

        }

        //already in base class
        //public string Email { get; set; }
        //public string UserName { get; set; }

        public string token { get; set; }
        public int expiration { get; set; }

        //
        public string UserId { get; set; }
        public string SessionId { get; set; }
        public string APSubjectId { get; set; }
        public string APGroupId { get; set; }
        public string QuoteId { get; set; }
    }
}
