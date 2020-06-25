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
    
    public partial class TipoJuego
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TipoJuego()
        {
            this.Calificacion = new HashSet<Calificacion>();
            this.Ejercicio = new HashSet<Ejercicio>();
        }
    
        public int TipoJuegoId { get; set; }
        public string Nombre { get; set; }
        public string Estado { get; set; }
        public int TemaId { get; set; }
        public int Orden { get; set; }
        public string Nivel { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Calificacion> Calificacion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Ejercicio> Ejercicio { get; set; }
        public virtual Tema Tema { get; set; }
    }
}
