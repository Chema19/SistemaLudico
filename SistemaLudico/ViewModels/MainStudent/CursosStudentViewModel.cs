using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SistemaLudico.Controllers;
using SistemaLudico.Models;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class CursosStudentViewModel
    {
        public List<Curso> LstCurso { set; get; } = new List<Curso>();

        public void Fill(CargarDatosContext cd) {
            LstCurso = cd.context.Curso.ToList();
        }
    }
}