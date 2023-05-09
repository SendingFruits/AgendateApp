using Agendate_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Services
{
    internal interface ILoginServices
    {
        Task<Usuario> Login(string username, string password);
    }
}
