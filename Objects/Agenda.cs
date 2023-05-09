using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public class Agenda
    {
        public int Id { get; set; }
        public Servicio servicioAgendado { get; set; }
        public Empresa empresaSupervisora { get; set; }
        public double tiempoCancelacion { get; set; }

        public List<Reserva> ReservasRealizadas { get; set; }
    }
}
