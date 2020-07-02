using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class NumerationController : BaseController
    {
        public ActionResult Index(Int32? CursoId)
        {
            TemaCursoViewModel vm = new TemaCursoViewModel();
            vm.Fill(CargarDatosContext(), CursoId);
            return View(vm);
        }

        public ActionResult OneToFiveStart(Int32 CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }

        public ActionResult SixToTenStart(Int32 CursoId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.CursoId = CursoId;
            return View(vm);
        }
    }
}