using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Empresa : Usuario
    {
        public string RUT { get; set; }
        public string Direccion { get; set; }
        public string Descripcion { get; set; }
        public byte[] Logo { get; set; }

        public Servicio Servicio { get; set; }
        public Agenda Agenda { get; set; }

        public List<Clasificacion> ClasificacionesEmpresa { get; set; }
        public List<Promocion> PromocionesEmpresa { get; set; }

        public Empresa(int id, string username, string password, string correo, string nombreCompleto, string celular,
            Ubicacion ubicacion,
            string rut, string direccion, string derscripcion, byte[] logo,
            Servicio servicio, Agenda agenda, List<Clasificacion> clasificaciones, List<Promocion> promos)
            : base(id, username, password, correo, nombreCompleto, celular, ubicacion)
        {
            RUT = rut;
            Direccion = direccion;
            Descripcion = derscripcion;
            Logo = logo;
            Servicio = servicio;
            Agenda = agenda;
            ClasificacionesEmpresa = clasificaciones;
            PromocionesEmpresa = promos;
        }

        public Empresa(string username, string password, string correo, string nombreCompleto, string celular,
            string rut, string direccion, string derscripcion, byte[] logo,
            Servicio servicio, Agenda agenda, List<Clasificacion> clasificaciones, List<Promocion> promos)
            : base(username, password, correo, nombreCompleto, celular)
        {
            RUT = rut;
            Direccion = direccion;
            Descripcion = derscripcion;
            Logo = logo;
            Servicio = servicio;
            Agenda = agenda;
            ClasificacionesEmpresa = clasificaciones;
            PromocionesEmpresa = promos;
        }

        public Empresa(string username, string password, string correo, string nombreCompleto, string celular,
            string rut, string direccion, string derscripcion, byte[] logo)
            : base(username, password, correo, nombreCompleto, celular)
        {
            RUT = rut;
            Direccion = direccion;
            Descripcion = derscripcion;
            Logo = logo;
        }
    }
}
