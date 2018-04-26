using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

//
using Newtonsoft.Json;
using System.Net.Http;
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

namespace aspnetmvc_angular_sample.Controllers
{
	// ** SAMPLE CODE ** //
	// ** TESTING PROXY MIDDLEWARE CLASS  ** //

	[Produces("application/json")]
	[Route("api/BusinessClass")]
	public class BusinessClassController : Controller
	{


		[HttpGet]
		[Authorize(Roles = "Admin")]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[EnableCors("MyPolicy")]
		public JsonResult ApiMiddleWare()
		{

			//HttpClient client = new HttpClient();
			//client.DefaultRequestHeaders.Accept.Clear();
			//client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
			//client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

			try {

				var token = this.HttpContext.Request.Headers["Authorization"];

				// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** 

				List<DWXF710> businessClasses = new List<DWXF710>();

				//JsonSerializerSettings settings = new JsonSerializerSettings { Formatting = Formatting.Indented };
				//string json = JsonConvert.SerializeObject(value, settings);

				HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass");
				request.Method = "GET";
				//request.ContentLength = json.Length;
				request.ContentType = "application/json";
				request.Headers.Add("Authorization", token);

				//StreamWriter requestWriter = new StreamWriter(request.GetRequestStream(), System.Text.Encoding.ASCII);
				//requestWriter.Write(json);
				//requestWriter.Close();

				HttpWebResponse response = (HttpWebResponse)request.GetResponse();
				StreamReader reader = new StreamReader(response.GetResponseStream());
				string responseFromServer = reader.ReadToEnd();

				//
				businessClasses = JsonConvert.DeserializeObject<List<DWXF710>>(responseFromServer);
				JsonSerializerSettings settings = new JsonSerializerSettings { Formatting = Formatting.Indented };
				return Json(businessClasses, settings);

				// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** 

				//using (HttpResponseMessage res = await client.GetAsync("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass"))
				//using (HttpContent content = res.Content)
				//{
				//	string data = await content.ReadAsStringAsync();
				//	if (data != null)
				//	{
				//		return Json(data);
				//	}
				//	else
				//	{
				//		return null;
				//	}
				//}

				//var serializer = new DataContractJsonSerializer(typeof(List<DWXF710>));
				//var streamTask = client.GetStreamAsync("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass");
				//var repositories = serializer.ReadObject(await streamTask) as List<DWXF710>;
				//return Json(repositories);

				//var stringTask = client.GetStringAsync("http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass");
				//var msg = await stringTask;
				//return Json(msg);

			}
			catch (Exception ex) {
				throw ex;
			}

		}

	}
}
