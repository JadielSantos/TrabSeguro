using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using testweb.Model;

namespace testweb.Pages
{
	public class IndexModel : PageModel
	{
		public void OnGet()
		{

		}

		[Route("api/login")]
		[HttpGet]
		protected User Login()
		{
			User user = new User();
			string query = string.Empty;
			string connetionString = @"Data Source=JADIEL\LOCALSQL;Initial Catalog=Geral;User ID=adm;Password=adm@123";

			using (SqlConnection cnn = new SqlConnection(connetionString))
			{
				cnn.Open();

				query += "SELECT * FROM [Geral].[dbo].[User] WHERE Nome = @Nome AND Senha = @Senha";

				cnn.Close();
			}

			return user;
		}
	}
}
