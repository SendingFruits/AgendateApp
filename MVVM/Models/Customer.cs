using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.MVVM.Models
{
    public class Customer : User
    {
        public double Photo { get; set; }
        public double Identification { get; set; }
    }
}
