using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeamFoundation.Controllers
{
    public class ForgotPasswordController : Controller
    {
        // GET: ForgotPassword
        public ActionResult Index()
        {
            if (Session["username"] != null && Session["user_session_id"] != null)
            {
                return Redirect("http://localhost:57904/");
            }

            ViewBag.PostTo = Request.Url.Authority + "/ForgotPassword/Send/";
            return View();
        }

        [HttpPost]
        public ActionResult Send()
        {
            return View();
        }
    }
}