using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Text;
using TeamFoundation.Encryption;

namespace TeamFoundation.Models
{
    public class Register
    {

        public bool MatchPassword(string password, string confirmPassword)
        {
            return password == confirmPassword;
        }

        public bool registerUser(string firstName, string lastName, string userName, string emailID, string password)
        {
            Encode encode = new Encode();
            bool isRegistered = false;
            Database db = new Database();
            password = encode.ToMd5(password);
            SqlConnection con = new SqlConnection(db.getConnectionString());

            try
            {
                SqlCommand cmd = new SqlCommand("registerUser", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("emailId", emailID);
                cmd.Parameters.AddWithValue("username", userName);
                cmd.Parameters.AddWithValue("firstName", firstName);
                cmd.Parameters.AddWithValue("lastName", lastName);
                cmd.Parameters.AddWithValue("password", password);
                con.Open();

                int row = cmd.ExecuteNonQuery();
                if (row != 0)
                {
                    isRegistered = true;
                }
            }
            catch (Exception e)
            {
                
            }
            finally
            {
                con.Close();
            }

            return isRegistered;
        }

        public bool isRegistered(string columnName, string email)
        {
            bool registered = false;

            Database db = new Database();
            SqlConnection con = new SqlConnection(db.getConnectionString());
            int count = 0;
            try
            {
                string query = "SELECT COUNT(emailId) AS count FROM users WHERE " + columnName + " = @emailid;";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@emailId", SqlDbType.VarChar);
                cmd.Parameters["@emailId"].Value = email;
                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {

                        count = Int32.Parse(reader["count"].ToString());
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
    }
}