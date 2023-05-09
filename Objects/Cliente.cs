using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Cliente : Usuario
    {
        public string Documento { get; set; }
        public byte[] Foto { get; set; }

        public List<Reserva> HistorialReservas { get; set; }
        public List<Clasificacion> ClasificacionesCliente { get; set; }

        public List<string> PreferenciasServicio { get; set; }



        public Cliente(int id, string username, string password, string correo, string nombreCompleto, string celular,
            Ubicacion ubicacion,
            string documento, byte[] foto, List<Reserva> historial, List<Clasificacion> clasificaicones, List<string> preferencias)
            : base(id, username, password, correo, nombreCompleto, celular, ubicacion)
        {
            Documento = documento;
            Foto = foto;
            HistorialReservas = historial;
            ClasificacionesCliente = clasificaicones;
            PreferenciasServicio = preferencias;
        }

        public Cliente(string username, string password, string correo, string nombreCompleto, string celular,
            string documento, byte[] foto, List<Reserva> historial, List<Clasificacion> clasificaicones)
            : base(username, password, correo, nombreCompleto, celular)
        {
            Documento = documento;
            Foto = foto;
            HistorialReservas = historial;
            ClasificacionesCliente = clasificaicones;
        }
    }
}
