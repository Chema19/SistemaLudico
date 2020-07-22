using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;

namespace SistemaLudico.ViewModels.MainAdmin
{
    public class LoginRegisterViewModel
    {
        public string Nombre { set; get; }
        public string Apellido { set; get; }
        public string Usuario { set; get; }
        public string Contrasenia { set; get; }
        public string UsuarioLogIn { set; get; }
        public string ContraseniaLogIn { set; get; }

        HttpContext context = HttpContext.Current;

        public Tuple<bool, string> Registrar(CargarDatosContext cd, LoginRegisterViewModel model)
        {
            try {
                using (var ts = new TransactionScope()) {
                    if (cd.context.Administrador.Any(x => x.Contrasenia == model.Contrasenia && x.Usuario == model.Usuario)) {
                        return Tuple.Create(false, "Cuentea de usuario ya existente");
                    }
                    else {
                        Administrador administrador = new Administrador();
                        cd.context.Administrador.Add(administrador);
                        administrador.Nombre = model.Nombre;
                        administrador.Apellido = model.Apellido;
                        administrador.FechaCreacion = DateTime.Now;
                        administrador.Estado = "ACT";
                        administrador.Usuario = model.Usuario;
                        administrador.Contrasenia = model.Contrasenia;
                        cd.context.SaveChanges();
                    }
                    ts.Complete();

                    return Tuple.Create(true, "Registro de usuario admistrador exitoso");
                }
            }
            catch (Exception ex) {
                return Tuple.Create(false, ex.Message);
            }
        }
        public Tuple<bool, string> LogIn(CargarDatosContext cd, LoginRegisterViewModel model)
        {
            try
            {
                if (cd.context.Administrador.Any(x => x.Contrasenia == model.ContraseniaLogIn && x.Usuario == model.UsuarioLogIn))
                {
                    var administrador = cd.context.Administrador.FirstOrDefault(x => x.Contrasenia == model.ContraseniaLogIn && x.Usuario == model.UsuarioLogIn);
                    context.Session["ADMINISTRADOR"] = administrador.AdministradorId;
                    return Tuple.Create(true ,"Inicio de sesión satisfactorio");
                }
                else {
                    return Tuple.Create(false ,"El usuario no existe");
                }
            }
            catch (Exception ex)
            {
                return Tuple.Create(false, ex.Message);
            }
        }
    }
}