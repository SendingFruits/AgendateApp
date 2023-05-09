using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Ubicacion
    {
        public double Latitud { get; set; }
        public double Longitud { get; set; }
        public string Lugar { get; set; }
        public string Descripcion { get; set; }

        public Ubicacion()
        {
            // ...
        }
    }
}
