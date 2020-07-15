﻿using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class MathProblemController : BaseController
    {

        public ActionResult Level(Int32? TemaId)
        {
            LevelViewModel vm = new LevelViewModel();
            vm.Fill(TemaId);
            return View(vm);
        }
        public ActionResult Games(Int32? TemaId, String LevelBIA)
        {
            GameViewModel vm = new GameViewModel();
            vm.Fill(CargarDatosContext(), TemaId, LevelBIA);
            return View(vm);
        }
        public ActionResult JuegoProblemasAditivos(Int32? TemaId, String LevelGame)
        {
            JuegoViewModel vm = new JuegoViewModel();
            vm.Fill(CargarDatosContext(), TemaId, LevelGame);
            return View(vm);
        }
        public ActionResult JuegoProblemaSustraccion(Int32? TemaId, String LevelGame)
        {
            JuegoViewModel vm = new JuegoViewModel();
            vm.Fill(CargarDatosContext(), TemaId, LevelGame);
            return View(vm);
        }
        public ActionResult Result(Int32? EjercicioId, Int32? Vidas)
        {
            ResultViewModel vm = new ResultViewModel();
            vm.Fill(CargarDatosContext(), EjercicioId, Vidas);
            return View(vm);
        }
        public ActionResult ResultByTopic(Int32? JuegoId, String LevelBIA)
        {
            ResultViewModel vm = new ResultViewModel();
            vm.FillResultLevelBIA(CargarDatosContext(), JuegoId, LevelBIA);
            return View(vm);
        }
        public JsonResult CalculateProblemaSustraccion(string Val1, string Val2, string Resp, Int32? EjercicioId)
        {

            try
            {
                var ejercicio = context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
                if (Val1 != ejercicio.Valor1 || Val2 != ejercicio.Valor2 || Resp != ejercicio.Resultado)
                {
                    var result = new
                    {
                        value = "false",
                        mensaje = "La operacion es incorrecta"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var result = new
                    {
                        value = "true",
                        mensaje = "La operacion es correcta"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CalculateProblemaAditivo(string Val1, string Val2, string Resp, Int32? EjercicioId)
        {

            try
            {
                var ejercicio = context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
                if (Val1 != ejercicio.Valor1 || Val2 != ejercicio.Valor2 || Resp != ejercicio.Resultado)
                {
                    var result = new
                    {
                        value = "false",
                        mensaje = "La operacion es incorrecta"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var result = new
                    {
                        value = "true",
                        mensaje = "La operacion es correcta"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
        }

        // GET: MatematicProblem
        public ActionResult Index(Int32? CursoId)
        {
            TemaCursoViewModel vm = new TemaCursoViewModel();
            vm.Fill(CargarDatosContext(), CursoId);
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
    }
}