using AgendateApp.MVVM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.API.Services.Intefaces
{
    internal interface IUsersServices
    {
        Task<User> Login(string username, string password);

        Task<User> Register(User userdata);


    }
}
