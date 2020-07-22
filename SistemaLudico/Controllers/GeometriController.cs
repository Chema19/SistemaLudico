using SistemaLudico.ViewModels.MainStudent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaLudico.Controllers
{
    public class GeometriController : BaseController
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
        public ActionResult JuegoPlanas(Int32? TemaId, Int32? LevelGame)
        {
            JuegoViewModel vm = new JuegoViewModel();
            vm.Fill(CargarDatosContext(), TemaId, LevelGame);
            return View(vm);
        }
        public ActionResult JuegoLineas(Int32? TemaId, Int32? LevelGame)
        {
            JuegoViewModel vm = new JuegoViewModel();
            vm.Fill(CargarDatosContext(), TemaId, LevelGame);
            return View(vm);
        }
        public ActionResult JuegoCuerpo(Int32? TemaId, Int32? LevelGame)
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

        public JsonResult CalculatePlana(string Resp, Int32? EjercicioId)
        {
            try
            {
                var ejercicio = context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
                if (Resp != ejercicio.Resultado.ToLower())
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
        public JsonResult CalculateLinea(string Resp, Int32? EjercicioId)
        {
            try
            {
                var ejercicio = context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
                var test = ejercicio.Resultado.ToLower();
                if (Resp != ejercicio.Resultado.ToLower())
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
        public JsonResult CalculateCuerpo(string Resp, Int32? EjercicioId)
        {

            try
            {
                var ejercicio = context.Ejercicio.FirstOrDefault(x => x.EjercicioId == EjercicioId);
                if (Resp != ejercicio.Resultado.ToLower())
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

    }
}