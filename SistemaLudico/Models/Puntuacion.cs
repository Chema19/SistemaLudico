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
    
    public partial class Puntuacion
    {
        public int PuntuacionId { get; set; }
        public int Nota { get; set; }
        public int JuegoId { get; set; }
        public Nullable<int> ParticipanteId { get; set; }
        public string LevelBIA { get; set; }
    
        public virtual Juego Juego { get; set; }
        public virtual Participante Participante { get; set; }
    }
}