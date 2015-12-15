using MobileWeb.Models;
using MobileWeb.Repository;
using MobileWeb.Views.Home.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobileWeb.Controllers
{
    public class HomeController : Controller
    {
        private string savePath = "Pictures/";

        private IRepository<friends> friendsRepository;

        public HomeController()
        {
            this.friendsRepository = new GenericRepository<friends>();
        }

        public ActionResult AddFriends()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddFriends(IndexViewModel model, HttpPostedFileBase myFile)
        {
            friends f = new friends();

            try
            {
                if (myFile != null)
                {
                    f.FirstName = model.Name.Substring(0, 1);
                    f.LastName = model.Name.Substring(1);
                    f.Tel = model.Tel;
                    f.Addr = model.Addr;
                    f.FileName = DateTime.Now.ToString("yyyyMMddhhmmss") + Path.GetExtension(myFile.FileName);
                    this.friendsRepository.Create(f);
                    myFile.SaveAs(Server.MapPath("~/" + savePath) + f.FileName);
                    TempData["isSuccess"] = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return RedirectToAction("AddFriends");
        }

        public ActionResult Info()
        {
            return View();
        }

        public ActionResult Search()
        {
            List<friends> friends = this.friendsRepository.GetAll().OrderBy(x => x.FirstName).ToList();
            ViewBag.SavePath = savePath;
            return View(friends);
        }

        public ActionResult FriendDetails(int id)
        {
            friends friend = this.friendsRepository.GetAll().Where(x => x.id == id).FirstOrDefault();
            return View(friend);
        }
    }
}