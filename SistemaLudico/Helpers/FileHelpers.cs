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
            IList<string> AllowedFileExtensions = new List<string> { ".pdf", ".pptx", ".docx", ".mp3" };
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
                var rutePhoto = "Files/" + SubFolder + "/" + CursoId.ToString() + extension;
                File.SaveAs(filePath);

                using (MemoryStream ms = new MemoryStream())
                {
                    File.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
                return rutePhoto;
            }
        }
    }
}