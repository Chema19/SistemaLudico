using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MainStudentController : BaseController
    {
        // GET: MainStudent
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(LoginStudentViewModel model)
        {
            LoginStudentViewModel wm = new LoginStudentViewModel();
            wm.Validacion(CargarDatosContext(), model);
            return RedirectToAction("Avatar", "MainStudent");
        }

        public ActionResult Avatar()
        {
            return View();
        }
        public ActionResult AvatarPersonaje()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Avatar(int? p)
        {
            return RedirectToAction("Cursos", "MainStudent");
        }

        public ActionResult Cursos()
        {
            CursosStudentViewModel vm = new CursosStudentViewModel();
            vm.Fill(CargarDatosContext());
            return View(vm);
        }
    }
}