using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        //public Empresa EmpresaAsociada { get; set; }
        //public Servicio ServicioReservado { get; set; }
        //public Agenda AgendaAsociada { get; set; }
        //public Cliente ClienteSolicitante { get; set; }
        public DateTime FechaHoraReserva { get; set; }
    }
}
