using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MainAdminController : Controller
    {
        // GET: MainAdmin
        public ActionResult Index()
        {
            return View();
        }
        #region Cursos
        public ActionResult Cursos()
        {
            return View();
        }
        #endregion
        #region Materiales
        public ActionResult Materiales()
        {
            return View();
        }
        #endregion
        #region Ejercicios
        public ActionResult Ejercicios()
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