using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TeamFoundation.Encryption;

namespace TeamFoundation.Models
{
    public class Login
    {

        public bool isActiveORDelete(string columnName, string username)
        {
            bool registered = false;
            Database db = new Database();
            SqlConnection con = new SqlConnection(db.getConnectionString());
            string scount = "";
            int count = 0;
            try
            {
                string query = "SELECT " + columnName + " AS count FROM users WHERE userName = @userName;";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@userName", SqlDbType.VarChar);
                cmd.Parameters["@userName"].Value = username;
                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        scount = reader["count"].ToString();
                        if (scount == "False")
                        {
                            count = 0;
                        }
                        else
                        {
                            count = 1;
                        }
                    }
                }

                if (count != 0)
                {
                    registered = true;
                }
            }
            catch (Exception e)
            {
                
            }
            finally
            {
                con.Close();
            }

            return registered;
        }

        public bool Authenticate(string username, string password)
        {
            bool valid = false;
            Encode encode = new Encode();
            password = encode.ToMd5(password);

            Database db = new Database();
            SqlConnection con = new SqlConnection(db.getConnectionString());
            int count = 0;
            try
            {
                string query = "SELECT COUNT(emailId) AS count FROM users WHERE username = @username AND password = @password;";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@username", SqlDbType.VarChar);
                cmd.Parameters.AddWithValue("@password", SqlDbType.VarChar);
                cmd.Parameters["@username"].Value = username;
                cmd.Parameters["@password"].Value = password;
                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        count = Int32.Parse(reader["count"].ToString());
                    }
                }

                if (count == 1)
                {
                    valid = true;
                }
            }
            catch (Exception e)
            {

            }
            finally
            {
                con.Close();
            }

            return valid;
        }
    }
}