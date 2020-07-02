using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SistemaLudico.Models;

namespace SistemaLudico.Controllers
{
    public class BaseController : Controller
    {
        // GET: BaseController
        protected BDSistemaLudicoEntities context { set; get; } = new BDSistemaLudicoEntities();
        private CargarDatosContext cargarDatosContext { set; get; }

        public BaseController() {
            context = new BDSistemaLudicoEntities();
        }

        public CargarDatosContext CargarDatosContext()
        {
            if (cargarDatosContext == null)
            {
                cargarDatosContext = new CargarDatosContext { context = context };
            }

            return cargarDatosContext;
        }
    }
    public class CargarDatosContext
    {
        public BDSistemaLudicoEntities context { get; set; }
    }
}