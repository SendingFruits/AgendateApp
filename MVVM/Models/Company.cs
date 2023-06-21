using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.MVVM.Models
{
    public class Company : User
    {
        public double Rut { get; set; }
        public double Ci { get; set; }
        public double BusinessName { get; set; } // Razon social
        public string Area { get; set; } // rubro
        public string Logo { get; set; }
        public string Description { get; set; }
        public string Street { get; set; }
        public string DoorNumber { get; set; }
        public string City { get; set; }

    }
}
