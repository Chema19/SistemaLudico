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
        public void Fill(CargarDatosContext cd, int? temaId) {
            this.Tema = cd.context.Tema.FirstOrDefault(x => x.TemaId == temaId);
        }
    }
}