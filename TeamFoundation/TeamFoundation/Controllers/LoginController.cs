using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TeamFoundation.Models;
using TeamFoundation.Encryption;
namespace TeamFoundation.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        [HttpGet]
        public ActionResult Index(string _ref)
        {
            if (Session["username"] != null && Session["user_session_id"] != null)
            {
                return Redirect("http://localhost:57904/Project");
            }

            ViewBag.Msg = "";
            if (_ref == "register")
            {
                ViewBag.Msg = "You have registered successfully.";
            }
            ViewBag.Error = "";
            if (TempData["Error"] != null)
            {
                List<string> error = (List<string>)TempData["Error"];
                if (error.Count != 0)
                {
                    ViewBag.Error = error;
                }
            }

            ViewBag.PostTo = Request.Url.Authority + "/Login/Authenticate/";
            return View();
        }

        [HttpPost]
        public ActionResult Authenticate(FormCollection formCollection)
        {
            Login login = new Login();
            Encode encode = new Encode();
            List<string> error = new List<string>();
            string username = formCollection["username"];
            bool isLoggedIn = false;

            if (!login.isActiveORDelete("isDelete", username))
            {
                if (login.isActiveORDelete("isActive", username))
                {
                    isLoggedIn = login.Authenticate(username, formCollection["password"]);
                    if (isLoggedIn == false)
                    {
                        error.Add("Username or password is wrong.");
                    }
                }
                else
                {
                    error.Add("Please verify your mail id before SignIn.");
                }
            }
            else
            {
                error.Add("Sorry, we haven't found your email id");
            }

            if (error.Count == 0)
            {
                if (isLoggedIn)
                {
                    Random rand = new Random();
                    int num = rand.Next(1, 1000);
                    Session["username"] = username;
                    Session["user_session_id"] = encode.ToMd5(username + DateTime.Now.ToString("yyyy-MM-ddTHH:mm:sszzz") + num.ToString());
                }
            }
            else
            {
                TempData["Error"] = error;
                return RedirectToAction("Index");
            }

            return Redirect("http://localhost:57904/Project");
        }
    }
}