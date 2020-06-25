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
    
    public partial class Tema
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tema()
        {
            this.Ejercicio = new HashSet<Ejercicio>();
            this.Progreso = new HashSet<Progreso>();
            this.TipoJuego = new HashSet<TipoJuego>();
        }
    
        public int TemaId { get; set; }
        public string Nombre { get; set; }
        public string RutaWord { get; set; }
        public string RutaPdf { get; set; }
        public string RutaAudio { get; set; }
        public string RutaPpt { get; set; }
        public System.DateTime FechaCreación { get; set; }
        public string Estado { get; set; }
        public Nullable<int> CursoId { get; set; }
        public Nullable<int> AdministradorEdicionId { get; set; }
    
        public virtual Administrador Administrador { get; set; }
        public virtual Curso Curso { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Ejercicio> Ejercicio { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Progreso> Progreso { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TipoJuego> TipoJuego { get; set; }
    }
}