using SistemaLudico.Controllers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class TemaCursoViewModel
    {

        public List<Tema> LstTema { set; get; } = new List<Tema>();

        public void Fill(CargarDatosContext cd, int? cursoId)
        {
            LstTema = cd.context.Tema.Where(x => x.CursoId == cursoId).ToList();
        }
    }
}