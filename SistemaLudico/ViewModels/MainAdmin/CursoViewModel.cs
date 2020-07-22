using SistemaLudico.Controllers;
using SistemaLudico.Helpers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;

namespace SistemaLudico.ViewModels.MainAdmin
{
    public class CursoViewModel
    {
        public List<Curso> LstCurso { set; get; } = new List<Curso>();
        public int? CursoId { set; get; }
        public string Nombre { set; get; }
        public HttpPostedFileBase RutaPDF { set; get; }
        public HttpPostedFileBase RutaAudio { set; get; }
        public HttpPostedFileBase RutaWord { set; get; }


        public void ListCursos(CargarDatosContext cd)
        {
            LstCurso = cd.context.Curso.ToList();
        }

        public void FillCurso(CargarDatosContext cd, Int32? cursoId) { 
            Curso curso = new Curso();
            curso = cd.context.Curso.FirstOrDefault(x => x.CursoId == cursoId);

            CursoId = cursoId;
            Nombre = curso.Nombre;
            //RutaPDF = curso.RutaPdf;
            //RutaAudio = curso.RutaAudio;
            //RutaWord = curso.RutaWord;
        }

        public string EditarCurso(CargarDatosContext cd, CursoViewModel model)
        {
            try
            {
                using (var ts = new TransactionScope())
                {
                    Curso curso = new Curso();
                    curso = cd.context.Curso.FirstOrDefault(x => x.CursoId == model.CursoId);

                    curso.Nombre = model.Nombre;
                    
                    if (model.RutaPDF != null) {
                        curso.RutaPdf = FileHelpers.SaveDocument(model.RutaPDF,"Curso", ".pdf", curso.CursoId);
                    }
                    if (model.RutaAudio != null)
                    {
                        curso.RutaAudio = FileHelpers.SaveDocument(model.RutaAudio, "Curso", ".mp4", curso.CursoId);
                    }
                    if (model.RutaWord != null)
                    {
                        curso.RutaWord = FileHelpers.SaveDocument(model.RutaWord, "Curso", ".docx", curso.CursoId);
                    }

                    cd.context.SaveChanges();
                    ts.Complete();
                }
                return "Curso Guardado Correctamente";
            } catch (Exception ex) {
                return ex.Message;
            }
        }
    }
}