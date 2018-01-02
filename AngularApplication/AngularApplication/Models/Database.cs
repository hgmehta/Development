using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace AngularApplication.Models
{
    public class Database
    {
        public string getConnectionString()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["specIndia"].ConnectionString;
            return connectionString;
        }
    }
}