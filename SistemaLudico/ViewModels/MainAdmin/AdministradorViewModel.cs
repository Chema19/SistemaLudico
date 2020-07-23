using SistemaLudico.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainAdmin
{
    public class AdministradorViewModel
    {
        public String Nombre { set; get; }
        public string Apellido { set; get; }
        public string Usuario { set; get; }
        public string Contraseña { set; get; }
        HttpContext context = HttpContext.Current;

        public void Fill(CargarDatosContext cd) {
            var adminId = (int)context.Session["ADMINISTRADOR"];
            var admin = cd.context.Administrador.FirstOrDefault(x => x.AdministradorId == adminId);
            this.Nombre = admin.Nombre;
            this.Apellido = admin.Apellido;
            this.Usuario = admin.Usuario;
            this.Contraseña = admin.Contrasenia;
        }

    }
}