using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Clasificacion
    {
        public int Id { get; set; }
        public int Valor { get; set; }
        public DateTime Fecha { get; set; }
        public Usuario Usuario { get; set; }
        public Servicio Servicio { get; set; }
        public Comentario Comentario { get; set; }



        public Clasificacion() { }
    }
}
