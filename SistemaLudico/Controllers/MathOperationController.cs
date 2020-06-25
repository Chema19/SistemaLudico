using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MathOperationController : Controller
    {
        // GET: MathOperation
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AditionStart()
        {
            return View();
        }
        public ActionResult SustractionStart()
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
        public ActionResult Result()
        {
            return View();
        }
    }
}