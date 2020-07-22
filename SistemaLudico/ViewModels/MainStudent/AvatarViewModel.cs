using SistemaLudico.Controllers;
using SistemaLudico.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class AvatarViewModel
    {
        public String Nombre { set; get; }
        public string Url { set; get; }
        HttpContext context = HttpContext.Current;

        public void Fill(CargarDatosContext cd)
        {
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);
            var participante = cd.context.Participante.FirstOrDefault(x => x.ParticipanteId == participanteId);
            this.Nombre = participante.Nombre + " " + participante.Apellido;
            this.Url = participante.Avatar;
            cd.context.SaveChanges();
        }

        public void SaveAvatar(CargarDatosContext cd, string imageData)
        {
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);
            var data = FileHelpers.SaveAvatar(imageData, participanteId.ToString());
            var participante = cd.context.Participante.FirstOrDefault(x => x.ParticipanteId == participanteId);
            participante.Avatar = data;
            cd.context.SaveChanges();
        }
    }
}