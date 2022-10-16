var mongoose = require("mongoose");
var passport = require("passport");
var express = require("express");
var router = express.Router();

mongoose.connect(
  "mongodb+srv://comp229:ryan2002@cluster0.bcesnv8.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "home" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "about" });
});

router.get("/project", function (req, res, next) {
  res.render("project", { title: "project" });
});

router.get("/services", function (req, res, next) {
  res.render("services", { title: "services" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "contact" });
});

router.get("/home", function (req, res, next) {
  res.render("index", { title: "home" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "register" });
});

var business = require("../models/businessList");
 
// business.create({contactName:"test",contactNumber:"98765432",contactEmail:"test@gmail.com"});
// business.create({contactName:"test1",contactNumber:"9899432",contactEmail:"test1@gmail.com"});
// business.create({contactName:"ryan",contactNumber:"98765432",contactEmail:"ryan@gmail.com"});
// business.create({contactName:"john smith",contactNumber:"89894",contactEmail:"st@gmail.com"});
// business.create({contactName:"hihi",contactNumber:"98765432",contactEmail:"tt@gmail.com"});

router.get("/businessContact", function (req, res, next) {
  business.find((err, list) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("businessContact", {
        title: "Business Contact List",
        list,
      });
    }
  });
});

router.get("/update/:id", (req, res, next) => {
  let id = req.params.id;
  business.findById(id, (err, contactToUpdate) => {
    if (err) {
      console.error(err);
    } else {
      console.log(contactToUpdate);
      res.render("update", {
        title: "Update Contact",
        list: contactToUpdate,
      });
    }
  });
});

router.post("/update/:id", (req, res, next) => {
  let id = req.params.id;
  let updateContact = business({
    _id: id,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    contactEmail: req.body.contactEmailAddress,
  });

  business.updateOne({ _id: id }, updateContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/businessContact");
    }
  });
});

router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  business.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/businessContact");
    }
  });
});

let User = require("../models/user");
router.post("/login", function (req, res, next) {
  console.log(req.body);
  const user = User.findOne({ username: req.body.username });
  if ((user.password = req.body.password)) {
    res.redirect("/businessContact");
  } else {
    res.statusMessage("Incorrect Login Info, PLEASE TRY AGAIN!")
    res.redirect("/login");
  }
});

let user = require("../models/user");

router.post("/register", (req, res, next) => {
  console.log(req.body);
  let newUser = user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.create(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/login");
    }
  });
});

// //To add new ducument into  business collection
// router.post("/businessContact", (req, res, next) => {
//   let newUser = business({
//     "contactName": req.body.name,
//     "contactNumber": req.body.number,
//     "contactEmail": req.body.email,
//   });
//   business.create(newUser, (err, business) => {
//     if (err) {
//       console.log(err);
//       res.end(err);
//     } else {
//       console.log(business)
//       res.redirect("/businessContact");
//     }
//   });
// });

module.exports = router;
