using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class QuestionViewModel
    {
        public Tema tema { set; get; }
        public void Fill(CargarDatosContext cd, int? temaId) {
            this.tema = cd.context.Tema.FirstOrDefault(x => x.TemaId == temaId);
        }
    }
}