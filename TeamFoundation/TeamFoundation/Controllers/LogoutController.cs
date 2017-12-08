using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeamFoundation.Controllers
{
    public class LogoutController : Controller
    {
        // GET: Logout
        public ActionResult Index()
        {
            if (Session["username"] != null && Session["user_session_id"] != null)
            {
                Session.Clear();
                return Redirect("http://localhost:57904/");
            }
            else
            {
                return Redirect("http://localhost:57904/");
            }
        }
    }
}