using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

//
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;

//
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

//
using System.Net;
using System.IO;
using aspnetmvc_angular_sample.Models;
using Newtonsoft.Json.Serialization;

namespace aspnetmvc_angular_sample.Controllers
{
	//my .github erpo
	//public class ProxyHandlerController : DelegatingHandler
	public class ProxyHandlerController : Controller
	{
		[Produces("application/json")]
		[Route("api/ProxyHandler")]
		//protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
		public async Task<HttpResponseMessage> ApiForward()
		{
			HttpRequestMessage request = new HttpRequestMessage();
			UriBuilder forwardUri = new UriBuilder("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass");

			//strip off the proxy port and replace with an Http port
			forwardUri.Port = 80;
			//send it on to the requested URL
			request.RequestUri = forwardUri.Uri;
			HttpClient client = new HttpClient();
			var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
			var msg = response.RequestMessage;
			return response;

		}

		[HttpGet]
		[EnableCors("MyPolicy")]
		[Produces("application/json")]
		[Route("api/ProxyGetAllBusinessClass")]
		[Authorize(Roles = "Admin")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public JsonResult ProxyGetAllBusinessClasses()
		{	

			try
			{
				
				var token = this.HttpContext.Request.Headers["Authorization"];				

				//back-end behind firewall api call 
				HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass");
				request.Method = "GET";
				request.ContentType = "application/json";
				request.Headers.Add("Authorization", token);
				
				//dynamic obj
				HttpWebResponse response = (HttpWebResponse)request.GetResponse();
				StreamReader reader = new StreamReader(response.GetResponseStream());
				dynamic json = JsonConvert.DeserializeObject(reader.ReadToEnd());
				return Json(json);

				//uses class obj
				//List<DWXF710> businessClasses = new List<DWXF710>();
				//HttpWebResponse response = (HttpWebResponse)request.GetResponse();
				//StreamReader reader = new StreamReader(response.GetResponseStream());
				//businessClasses = JsonConvert.DeserializeObject<List<DWXF710>>(reader.ReadToEnd());
				//JsonSerializerSettings settings = new JsonSerializerSettings { Formatting = Formatting.Indented };
				//return Json(businessClasses,settings);

			}
			catch (Exception ex)
			{
				throw ex;
			}

		}

		[HttpPost]
		[EnableCors("MyPolicy")]
		[Route("api/ProxyPostCall")]
		[Produces("application/json")]
		//[Authorize(Roles = "Admin")]
		//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		//public JsonResult ProxyPostCall([FromBody] DWXF710 postdata)
		//public IActionResult ProxyPostCall([FromBody] DWXF710 postdata)
		public JsonResult ProxyPostCall([FromBody] object postdata)
		{

			try {

				 
				var token = this.HttpContext.Request.Headers["Authorization"];
				string requestPath = (string)this.HttpContext.Request.Headers["RequestPath"];
								

				JsonSerializerSettings settings = new JsonSerializerSettings{ Formatting = Formatting.Indented };
				string json = JsonConvert.SerializeObject(postdata, Formatting.Indented, settings);

				HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://dev-net-brn.MIG.local/MigAuthService/" + requestPath);
				request.Method = "POST";
				request.ContentLength = json.Length;
				request.ContentType = "application/json";
				request.Headers.Add("Authorization", token);

				StreamWriter requestWriter = new StreamWriter(request.GetRequestStream(), System.Text.Encoding.ASCII);
				requestWriter.Write(json);
				requestWriter.Close();
				
				HttpWebResponse response = (HttpWebResponse)request.GetResponse();
				StreamReader reader = new StreamReader(response.GetResponseStream());
				object jsonResponse = JsonConvert.DeserializeObject(reader.ReadToEnd());
				return Json(jsonResponse, settings);

				//old way
				//DWXF710 businessClass = new DWXF710();
				//HttpWebResponse response = (HttpWebResponse)request.GetResponse();
				//StreamReader reader = new StreamReader(response.GetResponseStream());
				//businessClass = JsonConvert.DeserializeObject<DWXF710>(reader.ReadToEnd());
				//var jsonResponse = Json(businessClass, settings);

				//if (businessClass != null)
				//{
				//	//turn Ok(200);
				//	return jsonResponse;
				//}
				//else
				//{
				//	return NotFound();
				//}

			}
			catch (Exception ex) {
				throw ex;
			}

		}
	}
	public class LowercaseContractResolver : DefaultContractResolver
	{
		protected override string ResolvePropertyName(string propertyName)
		{
			return propertyName.ToUpper();
		}
	}

}

