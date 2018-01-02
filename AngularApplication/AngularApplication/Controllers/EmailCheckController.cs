using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularApplication.Models;
using AngularApplication.DBContext;
namespace AngularApplication.Controllers
{
    public class EmailCheckController : BaseAPIController
    {
        public HttpResponseMessage Post([FromBody]string EmailId)
        {
            Register register = new Register();

            string status = register.isMailRegistered(EmailId);
            return ToJson(status);
        }
    }
}
