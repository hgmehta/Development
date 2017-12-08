using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace TeamFoundation.Models
{
    public class Database
    {
        public string getConnectionString()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["TeamFoundationDB"].ConnectionString;
            return connectionString;
        }
    }
}