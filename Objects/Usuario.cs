using CommunityToolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agendate_App.Objects
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string CorreoElectronico { get; set; }
        public string NombreCompleto { get; set; }
        public string Celular { get; set; }
        public Ubicacion Ubicacion { get; set; }


        public Usuario(int id, string username, string password, string correo, string nombreCompleto, string celular,
            Ubicacion ubicacion)
        {
            Id = id;
            Username = username;
            Password = password;
            CorreoElectronico = correo;
            NombreCompleto = nombreCompleto;
            Celular = celular;
            Ubicacion = ubicacion;
        }

        public Usuario(string username, string password, string correo, string nombreCompleto, string celular)
        {
            Username = username;
            Password = password;
            CorreoElectronico = correo;
            NombreCompleto = nombreCompleto;
            Celular = celular;
        }

        public Usuario(string username, string password, string correo, string nombreCompleto, string celular,
            Ubicacion ubicacion)
        {
            Username = username;
            Password = password;
            CorreoElectronico = correo;
            NombreCompleto = nombreCompleto;
            Celular = celular;
            Ubicacion = ubicacion;
        }

        public Usuario(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public Usuario()
        {

        }
    }
}
