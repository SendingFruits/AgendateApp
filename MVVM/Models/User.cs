using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.MVVM.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Movil { get; set; }

        public double Latitud { get; set; }
        public double Longitud { get; set; }
    }
}
