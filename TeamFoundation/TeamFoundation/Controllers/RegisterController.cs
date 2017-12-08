using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TeamFoundation.Models;
namespace TeamFoundation.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Index()
        {
            ViewBag.Error = "";
            if (Session["username"] != null && Session["user_session_id"] != null)
            {
                return Redirect("http://localhost:57904/");
            }

            if (TempData["Error"] != null)
            {
                List<string> error = (List<string>)TempData["Error"];
                if (error.Count != 0)
                {
                    ViewBag.Error = error;
                }
            }
            ViewBag.PostTo = Request.Url.Authority + "/Register/Validate/";
            return View();
        }

        [HttpPost]
        public ActionResult Validate(FormCollection formCollection)
        {
            bool isRegistered = false;
            Register register = new Register();
            List<string> error = new List<string>();

            if (register.MatchPassword(formCollection["pass"], formCollection["confirmpass"]))
            {
                if (!register.isRegistered("emailId", formCollection["email"]))
                {
                    if (!register.isRegistered("userName", formCollection["uname"]))
                    {
                        isRegistered = register.registerUser(formCollection["fname"], formCollection["lname"], formCollection["uname"], formCollection["email"], formCollection["pass"]);
                    }
                    else
                    {
                        error.Add("Username is already registered.");
                    }
                }
                else
                {
                    error.Add("Email Id is already registered.");
                }
            }
            else
            {
                error.Add("Password doesn't match.");
            }

            if (error.Count == 0 && isRegistered == true)
            {
                // Success View
                return Redirect("http://localhost:57904/Login?_ref=register");
            }
            else
            {
                TempData["Error"] = error;
                return RedirectToAction("Index");
            }
        }
    }
}