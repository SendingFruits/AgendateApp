using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public Empresa Empresa { get; set; }
        public TimeSpan Duracion { get; set; }
        public List<DateTime> HorariosDisponibles { get; set; }
        public double Precio { get; set; }


        public Servicio(int id, string nombre, string descripcion, Empresa empresa, List<DateTime> horariosDisponibles, double precio)
        {
            Id = id;
            Nombre = nombre;
            Descripcion = descripcion;
            Empresa = empresa;
            HorariosDisponibles = horariosDisponibles;
            Precio = precio;
        }

        public Servicio(string nombre, string descripcion, Empresa empresa, List<DateTime> horariosDisponibles, double precio)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Empresa = empresa;
            HorariosDisponibles = horariosDisponibles;
            Precio = precio;
        }
    }
}
