using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaLudico.ViewModels.MainStudent
{
    public class LevelViewModel
    {
        public Int32? TemaId { set; get; }
        public void Fill(Int32? temaId) {
            this.TemaId = temaId;
        }
    }
}