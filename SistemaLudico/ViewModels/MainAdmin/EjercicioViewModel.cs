using SistemaLudico.Controllers;
using SistemaLudico.Helpers;
using SistemaLudico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;

namespace SistemaLudico.ViewModels.MainAdmin
{
    public class EjercicioViewModel
    {

        public List<Ejercicio> LstEjercicio { set; get; } = new List<Ejercicio>();

        public int? EjercicioId { set; get; }
        public string Valos1 { set; get; }
        public string Valor2 { set; get; }
        public string Resultado { set; get; }
        public HttpPostedFileBase RutaImage { set; get; }
        public int JuegoId { set; get; }
        public List<Juego> LstJuego { set; get; } = new List<Juego>();
        public int TemaId { set; get; }
        public List<Tema> LstTema { set; get; } = new List<Tema>();
        public string LevelBIA { set; get; }
        
        public void ListEjercicios (CargarDatosContext cd)
        {
            LstEjercicio = cd.context.Ejercicio.ToList();
        }

        public void FillEjercicio(CargarDatosContext cd, Int32? ejercicioId) {
            Ejercicio ejercicio = new Ejercicio();

            ejercicio = cd.context.Ejercicio.FirstOrDefault(x => x.EjercicioId == ejercicioId);

            this.Valos1 = ejercicio.Valor1;
            this.Valor2 = ejercicio.Valor2;
            this.Resultado = ejercicio.Resultado;
            this.LstJuego = cd.context.Juego.ToList();
            this.JuegoId = ejercicio.JuegoId;
            this.LstTema = cd.context.Tema.ToList();
            this.TemaId = ejercicio.TemaId;
            this.LevelBIA = ejercicio.LevelBIA;
        }

        public string EditarCurso(CargarDatosContext cd, EjercicioViewModel model)
        {
            try
            {
                using (var ts = new TransactionScope())
                {
                    Ejercicio ejercicio = new Ejercicio();
                    ejercicio = cd.context.Ejercicio.FirstOrDefault(x => x.EjercicioId == model.EjercicioId);

                    ejercicio.Valor1 = model.Valos1;
                    ejercicio.Valor2 = model.Valor2;
                    ejercicio.Resultado = model.Resultado;
                    //ejercicio.JuegoId = model.JuegoId;
                    //ejercicio.TemaId = model.TemaId;

                    if (model.RutaImage != null)
                    {
                        string subFolder = string.Empty;
                        switch (ejercicio.Tema.CursoId) {
                            case 5:
                                subFolder = "math/";
                                break;
                            case 6:
                                subFolder = "operation/";
                                break;
                            case 7:
                                subFolder = "geometri/";
                                break;
                            case 8:
                                subFolder = "numeration/";
                                break;
                        }

                        switch (ejercicio.TemaId)
                        {
                            case 3:
                                subFolder = subFolder + "problemaditivo/";
                                break;
                            case 4:
                                subFolder = subFolder + "problemsustraccion/";
                                break;
                            case 5:
                                subFolder = subFolder + "adition/";
                                break;
                            case 6:
                                subFolder = subFolder + "subtraction/";
                                break;
                            case 7:
                                subFolder = subFolder + "multiplicacion/";
                                break;
                            case 8:
                                subFolder = subFolder + "lineas/";
                                break;
                            case 9:
                                subFolder = subFolder + "planas/";
                                break;
                            case 10:
                                subFolder = subFolder + "cuerpos/";
                                break;
                            case 11:
                                subFolder = subFolder + "1to5/";
                                break;
                            case 12:
                                subFolder = subFolder + "6to10/";
                                break;
                        }
                        var validate = model.RutaImage.FileName.Substring(model.RutaImage.FileName.LastIndexOf('.')).ToLower();
                        ejercicio.RutaImagen = FileHelpers.SaveImage(model.RutaImage, subFolder, validate, model.RutaImage.FileName);
                    }

                    cd.context.SaveChanges();
                    ts.Complete();
                }
                return "Curso Guardado Correctamente";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


    }
}