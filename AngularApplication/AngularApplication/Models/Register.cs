using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AngularApplication.Models
{
    public class Register
    {
        public string isMailRegistered(string email)
        {

            Database db = new Database();
            SqlConnection con = new SqlConnection(db.getConnectionString());
            int count = 0;
            string msg = "";
            try
            {
                string query = "SELECT COUNT(id) AS count FROM UserMaster WHERE EmailID = @email;";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@email", email);
                //cmd.Parameters["@email"].Value = email;
                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        count = Int32.Parse(reader["count"].ToString());
                        msg = count.ToString();
                    }
                }
            }
            catch (Exception e)
            {
                msg = "Sorry, we are facing some issue! Please try after some time";
            }
            finally
            {
                con.Close();
            }

            return msg;
        }
    }
}