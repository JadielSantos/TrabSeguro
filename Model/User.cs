using System;

namespace testweb.Model
{
	public class User
	{
		public int UserId
		{
			get;
			set;
		}

		public string Nome
		{
			get;
			set;
		}

		public string Senha
		{
			get;
			set;
		}

		public Guid UserGUID
		{
			get;
			set;
		}

		public override bool Equals(object obj)
		{
			if (obj == null)
				return false;

			return obj is User user &&
				   Nome == user.Nome &&
				   Senha == user.Senha &&
				   UserGUID.Equals(user.UserGUID);
		}
	}
}
