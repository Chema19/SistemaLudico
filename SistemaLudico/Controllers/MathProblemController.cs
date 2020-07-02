using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MathProblemController : BaseController
    {
        // GET: MatematicProblem
        public ActionResult Index(Int32? CursoId)
        {
            TemaCursoViewModel vm = new TemaCursoViewModel();
            vm.Fill(CargarDatosContext(), CursoId);
            return View(vm);
        }

        public ActionResult ProblenSustractionStart(Int32 CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }

        public ActionResult ProblenAditionStart(Int32 CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }

        public ActionResult Question1()
        {
            return View();
        }
        public ActionResult Question2()
        {
            return View();
        }
        public ActionResult Question3()
        {
            return View();
        }
        public ActionResult Question4()
        {
            return View();
        }
        public ActionResult Question5()
        {
            return View();
        }

        public ActionResult Level()
        {
            return View();
        }

        public ActionResult Games()
        {
            return View();
        }

        public ActionResult Juego1()
        {
            return View();
        }
        public ActionResult Juego2()
        {
            return View();
        }
        public ActionResult Juego3()
        {
            return View();
        }
        public ActionResult Juego4()
        {
            return View();
        }
        public ActionResult Juego5()
        {
            return View();
        }
        public ActionResult Result()
        {
            return View();
        }
    }
}