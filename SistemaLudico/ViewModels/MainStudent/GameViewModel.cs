using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class GameViewModel
    {
        public Int32? TemaId { set; get; }
        public String LevelBIA { set; get; }
        public Int32? JuegoId { set; get; }
        public List<Ejercicio> ListLevelBIA { set; get; } = new List<Ejercicio>();
        public List<Progreso> ListProgreso { set; get; } = new List<Progreso>();
        public Boolean ActivateCalificacion { set; get; }
        HttpContext context = HttpContext.Current;

        public void Fill(CargarDatosContext cd, Int32? temaId, String levelBIA) {
            this.TemaId = temaId;
            this.LevelBIA = levelBIA;
            this.ListLevelBIA = cd.context.Ejercicio.Where(x => x.LevelBIA == this.LevelBIA && x.TemaId == this.TemaId).OrderBy(x=>x.LevelGame).ToList();
            this.JuegoId = cd.context.Ejercicio.FirstOrDefault(x => x.LevelBIA == this.LevelBIA && x.TemaId == this.TemaId).JuegoId;
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);
            var lstProgreso = cd.context.Progreso.Where(x => x.ParticipanteId == participanteId && x.Ejercicio.JuegoId == JuegoId && x.Ejercicio.LevelBIA == LevelBIA && x.Nota > 0).ToList();
            this.ListProgreso = cd.context.Progreso.Where(x => x.ParticipanteId == participanteId && x.Ejercicio.JuegoId == JuegoId && x.Ejercicio.LevelBIA == LevelBIA).ToList(); ;
            if (lstProgreso.Count() == 5) {
                this.ActivateCalificacion = true;
            }
            else{
                this.ActivateCalificacion = false;
            }
        }
    }
}