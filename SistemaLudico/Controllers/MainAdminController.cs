using SistemaLudico.ViewModels.MainAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MainAdminController : BaseController
    {
        // GET: MainAdmin
        public ActionResult Index()
        {
            return View();
        }
        #region Cursos
        public ActionResult Cursos()
        {
            CursoViewModel vm = new CursoViewModel();
            vm.ListCursos(CargarDatosContext());
            return View(vm);
        }
        public ActionResult EditarCurso(int? CursoId)
        {
            CursoViewModel vm = new CursoViewModel();
            vm.FillCurso(CargarDatosContext(), CursoId);
            return View(vm);
        }
        [HttpPost]
        public ActionResult EditarCurso(CursoViewModel model)
        {
            if (model.RutaPDF != null) {
                var validatePDF = model.RutaPDF.FileName.Substring(model.RutaPDF.FileName.LastIndexOf('.')).ToLower();
                if (!validatePDF.Equals(".pdf")) {
                    CursoViewModel vm = new CursoViewModel();
                    vm.FillCurso(CargarDatosContext(), model.CursoId);
                    return View(vm);
                }
            }
            if (model.RutaWord != null)
            {
                var validateWord = model.RutaWord.FileName.Substring(model.RutaWord.FileName.LastIndexOf('.')).ToLower();
                if (!validateWord.Equals(".docx"))
                {
                    CursoViewModel vm = new CursoViewModel();
                    vm.FillCurso(CargarDatosContext(), model.CursoId);
                    return View(vm);
                }
            }
            if (model.RutaAudio != null)
            {
                var validateMp3 = model.RutaAudio.FileName.Substring(model.RutaAudio.FileName.LastIndexOf('.')).ToLower();
                if (!validateMp3.Equals(".mp3"))
                {
                    CursoViewModel vm = new CursoViewModel();
                    vm.FillCurso(CargarDatosContext(), model.CursoId);
                    return View(vm);
                }
            }
            CursoViewModel cursoViewModel = new CursoViewModel(); 
            cursoViewModel.EditarCurso(CargarDatosContext(), model);
            return RedirectToAction("Cursos");
        }
        #endregion
        #region Materiales
        public ActionResult Materiales()
        {
            TemaViewModel vm = new TemaViewModel();
            vm.ListTema(CargarDatosContext());
            return View(vm);
        }
        public ActionResult EditarMaterial(Int32? TemaId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.FillTema(CargarDatosContext(), TemaId);
            return View(vm);
        }
        [HttpPost]
        public ActionResult EditarMaterial(TemaViewModel model)
        {
            if (model.RutaPDF != null)
            {
                var validatePDF = model.RutaPDF.FileName.Substring(model.RutaPDF.FileName.LastIndexOf('.')).ToLower();
                if (!validatePDF.Equals(".pdf"))
                {
                    TemaViewModel vm = new TemaViewModel();
                    vm.FillTema(CargarDatosContext(), model.TemaId);
                    return View(vm);
                }
            }
            if (model.RutaWord != null)
            {
                var validateWord = model.RutaWord.FileName.Substring(model.RutaWord.FileName.LastIndexOf('.')).ToLower();
                if (!validateWord.Equals(".docx"))
                {
                    TemaViewModel vm = new TemaViewModel();
                    vm.FillTema(CargarDatosContext(), model.TemaId);
                    return View(vm);
                }
            }
            if (model.RutaAudio != null)
            {
                var validateMp3 = model.RutaAudio.FileName.Substring(model.RutaAudio.FileName.LastIndexOf('.')).ToLower();
                if (!validateMp3.Equals(".mp3"))
                {
                    TemaViewModel vm = new TemaViewModel();
                    vm.FillTema(CargarDatosContext(), model.TemaId);
                    return View(vm);
                }
            }
            TemaViewModel temaViewModel = new TemaViewModel();
            temaViewModel.EditarTema(CargarDatosContext(), model);
            return RedirectToAction("Materiales");
        }

        #endregion
        #region Ejercicios
        public ActionResult Ejercicios()
        {
            return View();
        }
        public ActionResult AgregarEjercicio()
        {
            return View();
        }
        public ActionResult EditarEjercicio()
        {
            return View();
        }
        #endregion
        #region Usuario
        public ActionResult Usuario()
        {
            return View();
        }
        #endregion
    }
}