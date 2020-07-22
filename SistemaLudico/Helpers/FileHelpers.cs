using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace SistemaLudico.Helpers
{
    public static class FileHelpers
    {
        private static string filePath;

        public static string SaveDocument(HttpPostedFileBase File,string SubFolder, string Format, int CursoId)
        {
            IList<string> AllowedFileExtensions = new List<string> { ".pdf", ".pptx", ".docx", ".mp4" };
            var extension = File.FileName.Substring(File.FileName.LastIndexOf('.')).ToLower();

            if (!Format.Equals(extension))
            {
                return "Error de archivo el formato debe ser " + Format; 
            }
            else
            {

                String sDirPath = HttpContext.Current.Server.MapPath("~/Files/" + SubFolder + "/");
                if (!Directory.Exists(sDirPath))
                {
                    Directory.CreateDirectory(sDirPath);
                }
                filePath = HttpContext.Current.Server.MapPath("~/Files/" + SubFolder + "/" + CursoId.ToString() + extension);
                var rutePhoto = "~/Files/" + SubFolder + "/" + CursoId.ToString() + extension;
                File.SaveAs(filePath);

                using (MemoryStream ms = new MemoryStream())
                {
                    File.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
                return rutePhoto;
            }
        }
        public static string SaveImage(HttpPostedFileBase File, string SubFolder, string Format, string nombre)
        {
            IList<string> AllowedFileExtensions = new List<string> { ".png", ".jpg", ".jpeg" };
            var extension = File.FileName.Substring(File.FileName.LastIndexOf('.')).ToLower();

            if (!Format.Equals(extension))
            {
                return "Error de archivo el formato debe ser " + Format;
            }
            else
            {

                String sDirPath = HttpContext.Current.Server.MapPath("~/Content/img/problem/" + SubFolder);
                if (!Directory.Exists(sDirPath))
                {
                    Directory.CreateDirectory(sDirPath);
                }
                filePath = HttpContext.Current.Server.MapPath("~/Content/img/problem/" + SubFolder + nombre.ToString() + extension);
                var rutePhoto = "~/Content/img/problem/" + SubFolder + nombre.ToString() + extension;
                File.SaveAs(filePath);

                using (MemoryStream ms = new MemoryStream())
                {
                    File.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
                return rutePhoto;
            }
        }
        public static string SaveAvatar(string imageData, string idStudent) {

        

            string fileNameWitPath = HttpContext.Current.Server.MapPath("~/Files/Student/" + idStudent + ".png");
            string ruta = String.Empty;
            using (FileStream fs = new FileStream(fileNameWitPath, FileMode.Create))
            {
                using (BinaryWriter bw = new BinaryWriter(fs))

                {
                    byte[] data = Convert.FromBase64String(imageData);
                    bw.Write(data);
                    bw.Close();
                    ruta = "~/Files/Student/" + idStudent + ".png";
                }
            }
            return ruta;
        }
    }
}