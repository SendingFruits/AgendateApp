using AgendateApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.Services
{
    internal interface ILoginServices
    {
        Task<Usuario> Login(string username, string password);
    }
}
