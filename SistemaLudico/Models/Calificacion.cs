//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SistemaLudico.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Calificacion
    {
        public int CalificacionId { get; set; }
        public decimal Nota { get; set; }
        public int CursoId { get; set; }
        public int JuegoId { get; set; }
    
        public virtual Curso Curso { get; set; }
        public virtual Juego Juego { get; set; }
    }
}
