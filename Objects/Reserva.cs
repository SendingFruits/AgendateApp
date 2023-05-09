using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Reserva
    {
        public int Id { get; set; }
        public Empresa EmpresaAsociada { get; set; }
        public Servicio ServicioReservado { get; set; }
        public Agenda AgendaAsociada { get; set; }
        public Cliente ClienteSolicitante { get; set; }
        public DateTime FechaHoraReserva { get; set; }


        public Reserva(int id, Empresa empresa, Servicio servicio, Agenda agenda, Cliente cliente, DateTime fecha)
        {
            Id = id;
            EmpresaAsociada = empresa;
            ServicioReservado = servicio;
            AgendaAsociada = agenda;
            ClienteSolicitante = cliente;
            FechaHoraReserva = fecha;
        }

        public Reserva(Empresa empresa, Servicio servicio, Agenda agenda, Cliente cliente, DateTime fecha)
        {
            EmpresaAsociada = empresa;
            ServicioReservado = servicio;
            AgendaAsociada = agenda;
            ClienteSolicitante = cliente;
            FechaHoraReserva = fecha;
        }
        public Reserva(Servicio servicio, Cliente cliente, DateTime fecha)
        {
            ServicioReservado = servicio;
            ClienteSolicitante = cliente;
            FechaHoraReserva = fecha;
        }

    }

}
