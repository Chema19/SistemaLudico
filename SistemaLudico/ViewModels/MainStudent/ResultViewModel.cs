using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class ResultViewModel
    {
        public string MensajeFinal { set; get; }
        public Ejercicio Ejercicio { set; get; } = new Ejercicio();
        HttpContext context = HttpContext.Current;
        public List<Tuple<string, int>> ListDetailNota { set; get; } = new List<Tuple<string, int>>();

        public void Fill(CargarDatosContext cd, Int32? EjercicioId, Int32? Vidas) {
            this.Ejercicio = new Ejercicio();
            this.Ejercicio = cd.context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
            var nota = 0;
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);
            switch (Vidas) {
                case 1:
                    this.MensajeFinal = "Haz obtenido 2 puntos";
                    nota = 2;
                    break;
                case 2:
                    this.MensajeFinal = "Haz obtenido 3 puntos";
                    nota = 3;
                    break;
                case 3:
                    this.MensajeFinal = "Haz obtenido 4 puntos";
                    nota = 4;
                    break;
            }

            var progreso = new Progreso();

            if (cd.context.Progreso.Any(x => x.EjercicioId == EjercicioId && x.ParticipanteId == participanteId))
            {
                progreso = cd.context.Progreso.FirstOrDefault(x => x.EjercicioId == EjercicioId && x.ParticipanteId == participanteId);
                if (nota > progreso.Nota) {
                    progreso.Nota = nota;
                }
                cd.context.SaveChanges();
            }
            else
            {
                cd.context.Progreso.Add(progreso);
                progreso.ParticipanteId = participanteId;
                progreso.EjercicioId = EjercicioId;
                progreso.Nota = nota;
                cd.context.SaveChanges();
            }
        }
        public void FillResultLevelBIA(CargarDatosContext cd, Int32? JuegoId, String LevelBIA)
        {
            var participanteId = (int)(context.Session["PARTICIPANTEID"]);
            var puntuacion = new Puntuacion();
            var listProgreso = cd.context.Progreso.Where(x => x.ParticipanteId == participanteId && x.Ejercicio.JuegoId == JuegoId && x.Ejercicio.LevelBIA == LevelBIA).ToList();
            this.Ejercicio = cd.context.Ejercicio.FirstOrDefault(x => x.JuegoId == JuegoId);
            if (cd.context.Puntuacion.Any(x => x.JuegoId == JuegoId && x.ParticipanteId == participanteId && x.LevelBIA == LevelBIA))
            {
                puntuacion = cd.context.Puntuacion.FirstOrDefault(x => x.JuegoId == JuegoId && x.ParticipanteId == participanteId && x.LevelBIA == LevelBIA);
                puntuacion.Nota = listProgreso.Sum(x => x.Nota).Value;
            }
            else
            {
                cd.context.Puntuacion.Add(puntuacion);
                puntuacion.Nota = listProgreso.Sum(x => x.Nota).Value;
                puntuacion.ParticipanteId = participanteId;
                puntuacion.JuegoId = JuegoId.Value;
                puntuacion.LevelBIA = LevelBIA;
            }
            cd.context.SaveChanges();

            foreach(var item in listProgreso) {
                this.ListDetailNota.Add(new Tuple<string, int>("Ejercicio " + item.Ejercicio.LevelGame, item.Nota.Value));
            }

            var level = String.Empty;
            switch (LevelBIA) {
                case "BAS":
                    level = "BÁSICO";
                    break;
                case "INT":
                    level = "INTERMEDIO";
                    break;
                case "AVA":
                    level = "AVANZADO";
                    break;
            }
            var juego = cd.context.Juego.FirstOrDefault(x => x.JuegoId == JuegoId);
            this.MensajeFinal = "Para el nivel " + level + " del tema " + juego.Tema.Nombre + " ha obtenido un total de " + puntuacion.Nota.ToString();
        }
    }
}