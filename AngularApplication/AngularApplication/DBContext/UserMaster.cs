//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularApplication.DBContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserMaster
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string MiddleName { get; set; }
        public string Lastname { get; set; }
        public bool Gender { get; set; }
        public System.DateTime Birthdate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
    }
}
