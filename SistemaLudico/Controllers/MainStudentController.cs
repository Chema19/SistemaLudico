using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MainStudentController : Controller
    {
        // GET: MainStudent
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(int? p)
        {
            return RedirectToAction("Avatar", "MainStudent");
        }

        public ActionResult Avatar()
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
            return View();
        }
    }
}