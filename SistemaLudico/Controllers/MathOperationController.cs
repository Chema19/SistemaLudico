using SistemaLudico.ViewModels.MainStudent;
using SistemaLudico.Views.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MathOperationController : BaseController
    {
        // GET: MathOperation
        public ActionResult Index(Int32? CursoId)
        {
            TemaCursoViewModel vm = new TemaCursoViewModel();
            vm.Fill(CargarDatosContext(), CursoId);
            return View(vm);
        }

        public ActionResult AditionStart(Int32? CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }
        public ActionResult SustractionStart(Int32? CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }
        public ActionResult TableTwoAndThreeStart(Int32? CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }

        public ActionResult Level()
        {
            return View();
        }

        public ActionResult Games(String Level)
        {
            GameViewModel vm = new GameViewModel();
            vm.Level = Level;
            return View(vm);
        }
        public ActionResult Juego1(String Level)
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