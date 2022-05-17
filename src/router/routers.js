var express = require("express");
const Employee = require("../model/register");
var router = express.Router();
const bcrypt = require("bcryptjs");
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    if (req.body.password === req.body.confirmpassword) {
      const result = await Employee(req.body);

      const token = await result.generateAuthToken();
      // console.log(result);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      const addUser = await result.save();

      res.render("index", { result: result });
    } else {
      res.send("password not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/login", async (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await Employee.findOne({ email: email });

    if (!result) {
      res.send("invalid email");
    } else {
      // res.send(result.password);
      const passwordMatch = await bcrypt.compare(password, result.password);
      const token = await result.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      if (email == result.email && passwordMatch) {
        res.render("index", { result: result });
      } else {
        res.send("invalid email or password");
      }
    }
  } catch (error) {
    res.status(400).send("invalid email or password");
  }
});
module.exports = router;
