using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Promocion
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public DateTime FechaEnvio { get; set; }
        public bool Activa { get; set; }


        public Promocion()
        {
            // ...
        }

        public Promocion(int id, string nombre, string descripcion, DateTime fechaInicio, DateTime fechaFin, DateTime fechaEnvio, bool activa)
        {
            Id = id;
            Nombre = nombre;
            Descripcion = descripcion;
            FechaInicio = fechaInicio;
            FechaFin = fechaFin;
            FechaEnvio = fechaEnvio;
            Activa = activa;
        }


        public List<DateTime> CalcularFechasEnvio(int intervaloDias)
        {
            List<DateTime> fechasEnvio = new List<DateTime>();

            DateTime fechaActual = FechaInicio;

            while (fechaActual <= FechaFin)
            {
                fechasEnvio.Add(fechaActual);
                fechaActual = fechaActual.AddDays(intervaloDias);
            }

            return fechasEnvio;
        }
    }
}
