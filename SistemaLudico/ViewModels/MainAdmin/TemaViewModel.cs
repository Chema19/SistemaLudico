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
    public class TemaViewModel
    {
        public List<Tema> LstTema { set; get; } = new List<Tema>();
        public int? TemaId { set; get; }
        public string Nombre { set; get; }
        public HttpPostedFileBase RutaPDF { set; get; }
        public HttpPostedFileBase RutaAudio { set; get; }
        public HttpPostedFileBase RutaWord { set; get; }

        public void ListTema(CargarDatosContext cd)
        {
            LstTema = cd.context.Tema.ToList();
        }
        public void FillTema(CargarDatosContext cd, Int32? temaId)
        {
            Tema tema = new Tema();
            tema = cd.context.Tema.FirstOrDefault(x => x.TemaId == temaId);

            TemaId = temaId;
            Nombre = tema.Nombre;
            //RutaPDF = curso.RutaPdf;
            //RutaAudio = curso.RutaAudio;
            //RutaWord = curso.RutaWord;
        }
        public string EditarTema(CargarDatosContext cd, TemaViewModel model)
        {
            try
            {
                using (var ts = new TransactionScope())
                {
                    Tema tema = new Tema();
                    tema = cd.context.Tema.FirstOrDefault(x => x.TemaId == model.TemaId);

                    tema.Nombre = model.Nombre;
                    
                    if (model.RutaPDF != null)
                    {
                        tema.RutaPdf = FileHelpers.SaveDocument(model.RutaPDF, "Tema", ".pdf", tema.TemaId);
                    }
                    if (model.RutaAudio != null)
                    {
                        tema.RutaAudio = FileHelpers.SaveDocument(model.RutaAudio, "Tema", ".mp3", tema.TemaId);
                    }
                    if (model.RutaWord != null)
                    {
                        tema.RutaWord = FileHelpers.SaveDocument(model.RutaWord, "Tema", ".docx", tema.TemaId);
                    }

                    cd.context.SaveChanges();
                    ts.Complete();
                }
                return "Tema Guardado Correctamente";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}