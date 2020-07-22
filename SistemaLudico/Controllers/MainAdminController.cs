using SistemaLudico.Helpers;
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
        public ActionResult Login(bool? Created)
        {
            LoginRegisterViewModel vm = new LoginRegisterViewModel();
            vm.Fill(Created);
            return View(vm);
        }
        [HttpPost]
        public ActionResult Login(LoginRegisterViewModel model)
        {
            LoginRegisterViewModel vm = new LoginRegisterViewModel();
            var mensaje = vm.LogIn(CargarDatosContext(), model);
            if (mensaje.Item1 == false)
            {
                PostMessage(MessageType.Warning, mensaje.Item2);
                return RedirectToAction("Login", "MainAdmin");
            }
            else
            {
                PostMessage(MessageType.Success, mensaje.Item2);
                return RedirectToAction("Index", "MainAdmin");
            }
           
        }
        [HttpPost]
        public ActionResult Register(LoginRegisterViewModel model)
        {
            LoginRegisterViewModel vm = new LoginRegisterViewModel();
            var mensaje = vm.Registrar(CargarDatosContext(), model);
            if (mensaje.Item1 == false)
            {
                PostMessage(MessageType.Warning, mensaje.Item2);
            }
            else {
                PostMessage(MessageType.Success, mensaje.Item2);
            }
            return RedirectToAction("Login", "MainAdmin", new { Created = vm.Created });
        }
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
                var validateMp4 = model.RutaAudio.FileName.Substring(model.RutaAudio.FileName.LastIndexOf('.')).ToLower();
                if (!validateMp4.Equals(".mp4"))
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
                if (!validateMp3.Equals(".mp4"))
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
            EjercicioViewModel vm = new EjercicioViewModel();
            vm.ListEjercicios(CargarDatosContext());
            return View(vm);
        }
        public ActionResult EditarEjercicio(Int32? EjercicioId)
        {
            EjercicioViewModel vm = new EjercicioViewModel();
            vm.FillEjercicio(CargarDatosContext(), EjercicioId);
            return View(vm);
        }
        [HttpPost]
        public ActionResult EditarEjercicio(EjercicioViewModel model)
        {
            if (model.RutaImage != null)
            {
                IList<string> AllowedFileExtensions = new List<string> { ".png", ".jpg", ".jpeg" };
                var validate = model.RutaImage.FileName.Substring(model.RutaImage.FileName.LastIndexOf('.')).ToLower();
                if (!AllowedFileExtensions.Any(x=>x == validate))
                {
                    EjercicioViewModel vm = new EjercicioViewModel();
                    vm.FillEjercicio(CargarDatosContext(), model.TemaId);
                    return View(vm);
                }
            }
            EjercicioViewModel temaViewModel = new EjercicioViewModel();
            temaViewModel.EditarCurso(CargarDatosContext(), model);
            return RedirectToAction("Ejercicios");
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