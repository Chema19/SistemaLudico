using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SistemaLudico.Models;
using SistemaLudico.Controllers;
using System.Transactions;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class LoginStudentViewModel
    {
        public int ParticipanteId { set; get; }
        public string Nombre { set; get; }
        public string Apellido { set; get; }
        public string Codigo { set; get; }
        HttpContext context = HttpContext.Current;

        public string Validacion(CargarDatosContext cd, LoginStudentViewModel model) {
            try
            {
                    Participante participante = new Participante();
                if (cd.context.Participante.Any(x => x.Nombre == model.Nombre && x.Apellido == model.Apellido && x.Codigo == model.Codigo))
                {
                    participante = cd.context.Participante.FirstOrDefault(x => x.Nombre == model.Nombre && x.Apellido == model.Apellido && x.Codigo == model.Codigo);
                    context.Session["PARTICIPANTEID"] = participante.ParticipanteId;
                    return "Usuario ya registrado";
                }
                else
                {
                    cd.context.Participante.Add(participante);
                    participante.Nombre = model.Nombre;
                    participante.Apellido = model.Apellido;
                    participante.Codigo = model.Codigo;
                    participante.Estado = "ACT";
                    participante.FechaCreacion = DateTime.Now;
                    cd.context.SaveChanges();

                    return "Usuario registrado";
                }
            }
            catch (Exception ex) {
                return ex.Message;
            }
        }
    }
}