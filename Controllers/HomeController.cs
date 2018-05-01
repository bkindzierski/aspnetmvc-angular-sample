using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

//
using System.Text;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using aspnetmvc_angular_sample.Models;
using Microsoft.Extensions.Configuration;


namespace aspnetmvc_angular_sample.Controllers
{
    public class HomeController : Controller
    {

		//protected RoleManager<IdentityRole> RoleManager { get; private set; }
		//protected UserManager<UserData> UserManager { get; private set; }
		protected IConfiguration Configuration { get; private set; }
		protected JsonSerializerSettings JsonSettings { get; private set; }


		public HomeController(IConfiguration configuration)
        {
			
			Configuration = configuration;

			// Instantiate a single JsonSerializerSettings object
			// that can be reused multiple times.
			JsonSettings = new JsonSerializerSettings()
			{
			Formatting = Formatting.Indented
			};
        }


        //public JsonResult Post(UserObj user)
        //public JsonResult Post([FromBody] UserObj user) <-- does not work with[FromBody] attribute
        [HttpPost]
        //[AllowAnonymous]
        [Route("api/LansaAuthenticate")]
        public async Task<IActionResult> Index(UserData userData)
        //public JsonResult Index()
        {
			//test data
			//UserData data = new UserData();
			//data.UserId = "kindzieb";
			//data.SessionId = "L008F975C34076301A66903092018132424";
			//data.UserName = "Brian Kindzierski";
			//data.Email = "bkindzierski@MerchantsGroup.com";
			//data.APSubjectId = "8141";
			//data.APGroupId = "100100";
			//data.QuoteId = "1569810";

			var identity = User.Identity as ClaimsIdentity;

			// return a generic HTTP Status 500 (Server Error)
			//if the client payload is invalid.
			if (userData == null) return new StatusCodeResult(500);

            // 
            JsonSerializerSettings config = new JsonSerializerSettings { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore };

            if (!DBNull.Value.Equals(userData.UserId))
            {
              //return GetToken(userData);
              TokenResponseViewModel response = await GetToken(userData);
              var userToken = JsonConvert.SerializeObject(response, Formatting.Indented, config);

              ViewData["data"] = userToken;
              return View();
            }
            else
            { // not supported - return a HTTP 401 (Unauthorized)
              return new UnauthorizedResult();
            }

        }
        
        //private ActionResult GetToken(UserData user)
        private async Task<TokenResponseViewModel> GetToken(UserData user)
        {
            try
            {
				// ** HERE WE GO TO LANSA FOR AUTH 
				// before issuing the token ** // 

				//var identity = User.Identity as ClaimsIdentity;
				

				// create and return the Jwt token.
				DateTime now = DateTime.UtcNow;

				//var userClaims = new List<Claim>();
				//userClaims.Add(new Claim(ClaimTypes.Role, "Admin"));
				//userClaims.Add(new Claim(ClaimTypes.Role, "Users"));

				// add the registered claims for JWT (RFC7519).
				var claims = new[] {
							new Claim(JwtRegisteredClaimNames.Sub, user.UserId),
							new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
							new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString()),
							//add additional claims here
							new Claim(ClaimTypes.Role, "Admin"),
							new Claim(ClaimTypes.Role, "UnderWriter")
							//new Claim(ClaimTypes.Authentication, "true")
							  
						};

                var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));

                var token = new JwtSecurityToken(
                        issuer: Configuration["Auth:Jwt:Issuer"],
                        audience: Configuration["Auth:Jwt:Audience"],
                        claims: claims,
                        //notBefore: now,
                        expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                        signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256)
                );

				var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
				
				// build & return the response
				var response = new TokenResponseViewModel()
                {
                    UserId      = user.UserId,
                    UserName    = user.UserName,
                    Email       = user.Email,
                    SessionId   =  user.SessionId,
                    APSubjectId = user.APGroupId,
                    APGroupId   = user.APGroupId, 
                    QuoteId     = user.QuoteId,
                    token       = encodedToken,
                    expiration  = tokenExpirationMins
                };

                return response;
                //return Json(response);
            }
            catch (Exception ex)
            {
                throw ex;
                //return new UnauthorizedResult();
            }
        }

        public IActionResult About()
		    {
			    ViewData["Message"] = "Your application description page.";

			    return View();
		    }

			  public IActionResult Contact()
			  {
				  ViewData["Message"] = "Your contact page.";

				  return View();
			  }

			  public IActionResult Error()
			  {
				  return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
			  }

	  }

}
