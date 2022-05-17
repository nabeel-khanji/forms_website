var express = require("express");
const app = express();

const Employee = require("../model/register");
var router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/secret", (req, res) => {
  console.log(`this is the cookie ${req.cookies}`);
  res.render("secret");
});

router.post("/register", async (req, res) => {
  try {
    if (req.body.password === req.body.confirmpassword) {
      const result = await Employee(req.body);

      const token = await result.generateAuthToken();
      // console.log(result);
      res.cookie("access_token", token, {
        expires: new Date(Date.now() + 300000),
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

      res.cookie("access_token", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
      });
      // console.log(`this is the cookie ${req.cookies.access_token}`);

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
