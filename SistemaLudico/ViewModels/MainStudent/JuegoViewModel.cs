using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class JuegoViewModel
    {
        public Int32? TemaId { set; get; }
        public Int32? LevelGame { set; get; }
        public String LevelBIA { set; get; }
        public Ejercicio Ejercicio { set; get; }
        public void Fill(CargarDatosContext cd, Int32? temaId, Int32? levelGame)
        {
            this.TemaId = temaId;
            this.LevelGame = levelGame;
            Ejercicio = cd.context.Ejercicio.FirstOrDefault(x => x.TemaId == this.TemaId && x.LevelGame == this.LevelGame);
            this.LevelBIA = Ejercicio.LevelBIA;
        }
    }
}