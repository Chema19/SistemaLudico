﻿using SistemaLudico.Helpers;
using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MainStudentController : BaseController
    {
        // GET: MainStudent
        public ActionResult Index(bool Registrado = false)
        {
            LoginStudentViewModel wm = new LoginStudentViewModel();
            wm.Fill(Registrado);
            return View(wm);
        }
        [HttpPost]
        public ActionResult Index(LoginStudentViewModel model)
        {
            LoginStudentViewModel wm = new LoginStudentViewModel();
            wm.Validacion(CargarDatosContext(), model);
            return RedirectToAction("Index", "MainStudent", new { Registrado = wm.Registrado });
        }

        [HttpPost]
        public ActionResult LogIn(LoginStudentViewModel model)
        {
            LoginStudentViewModel wm = new LoginStudentViewModel();
            wm.LogIn(CargarDatosContext(), model);
            return RedirectToAction("Avatar", "MainStudent");
        }

        public ActionResult Avatar()
        {
            AvatarViewModel vm = new AvatarViewModel();
            vm.Fill(CargarDatosContext());
            return View(vm);
        }
        public ActionResult AvatarPersonaje()
        {

            return View();
        }
        [HttpPost]
        public JsonResult saveImage(string imageData) {
            AvatarViewModel vm = new AvatarViewModel();
            vm.SaveAvatar(CargarDatosContext(), imageData);
            return Json("");
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
        public ActionResult Temas(Int32? CursoId)
        {
            TemaCursoViewModel vm = new TemaCursoViewModel();
            vm.Fill(CargarDatosContext(), CursoId);
            return View(vm);
        }
        public ActionResult TemaStart(Int32? TemaId)
        {
            TemaViewModel vm = new TemaViewModel();
            vm.Fill(CargarDatosContext(), TemaId);
            return View(vm);
        }
    }
}