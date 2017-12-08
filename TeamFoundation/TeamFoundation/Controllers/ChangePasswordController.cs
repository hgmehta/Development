using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeamFoundation.Controllers
{
    public class ChangePasswordController : Controller
    {
        // GET: ChangePassword
        public ActionResult Index()
        {
            if (Session["username"] != null && Session["user_session_id"] != null)
            {
                return Redirect("http://localhost:57904/");
            }

            return View();
        }
    }
}