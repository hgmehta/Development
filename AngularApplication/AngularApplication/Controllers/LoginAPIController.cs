using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularApplication.DBContext;
using System.Data.Entity.Core.Objects;
using AngularApplication.Models;

namespace AngularApplication.Controllers
{
    public class LoginAPIController : BaseAPIController
    {
        public HttpResponseMessage Post([FromBody]LoginModel value)
        {
            LoginModel loginObject = new LoginModel();
            string status = loginObject.login(value.EmailId, value.Password);
            return ToJson(status);
        }
    }
}
