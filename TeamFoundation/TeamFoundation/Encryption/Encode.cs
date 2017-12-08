using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace TeamFoundation.Encryption
{
    public class Encode
    {
        public string ToMd5(string pass)
        {
            MD5 md5Hash = MD5.Create();

            byte[] passworddata = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(pass));
            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < passworddata.Length; i++)
            {
                sBuilder.Append(passworddata[i].ToString("x2"));
            }

            return sBuilder.ToString();
        }
    }
}