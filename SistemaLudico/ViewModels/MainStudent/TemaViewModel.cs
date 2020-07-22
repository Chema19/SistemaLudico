using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class TemaViewModel
    {
        public Tema Tema { set; get; } = new Tema();
        HttpContext context = HttpContext.Current;


        public void Fill(CargarDatosContext cd, int? temaId) {
            this.Tema = cd.context.Tema.FirstOrDefault(x => x.TemaId == temaId);
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);

            var ejercicio = cd.context.Ejercicio.Where(x => x.TemaId == temaId).OrderBy(x => x.LevelGame).FirstOrDefault();
            if (!cd.context.Progreso.Any(x=>x.ParticipanteId == participanteId && x.EjercicioId == ejercicio.EjercicioId)) {             
                var progreso = new Progreso();
                cd.context.Progreso.Add(progreso);
                progreso.ParticipanteId = participanteId;
                progreso.EjercicioId = ejercicio.EjercicioId;
                progreso.Nota = 0;
                cd.context.SaveChanges();
            }
        }
    }
}