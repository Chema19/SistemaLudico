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
    
    public partial class Ejercicio
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ejercicio()
        {
            this.Progreso = new HashSet<Progreso>();
        }
    
        public int EjercicioId { get; set; }
        public int Valor1 { get; set; }
        public int Valor2 { get; set; }
        public int Resultado { get; set; }
        public string RutaImagen { get; set; }
        public int JuegoId { get; set; }
        public int TemaId { get; set; }
        public string Estado { get; set; }
        public Nullable<int> Orden { get; set; }
    
        public virtual Juego Juego { get; set; }
        public virtual Tema Tema { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Progreso> Progreso { get; set; }
    }
}
