const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("./db/con");
const Employee = require("./model/register");
const async = require("hbs/lib/async");
const port = process.env.PORT || 3000;
const app = express();
const public_path = path.join(__dirname, "../public");
const partial_path = path.join(__dirname, "../template/partials");
const view_path = path.join(__dirname, "../template/views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(public_path));
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partial_path);
const securePassword = async (password) => {
  const passwordHashed = await bcrypt.hash(password, 10);
  console.log(passwordHashed);
  const passwordMatch = await bcrypt.compare(password, passwordHashed);
  console.log(passwordMatch);
};
securePassword("nabeel");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    if (req.body.password === req.body.confirmpassword) {
      const result = await Employee(req.body);
      // console.log(result);
      const addUser = await result.save();
      console.log(addUser);
      console.log(result.name);
      res.render("index", { result: result });
    } else {
      res.send("password not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/login", async (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await Employee.findOne({ email: email });
    if (!result) {
      res.send("invalid email");
    } else {
      console.log(result.password);
      // res.send(result.password);
      const passwordMatch = await bcrypt.compare(password, result.password);
      console.log(passwordMatch);
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
const createToken =async()=>{
const token=await jwt.sign({_id:"6282036e7c33ccbd3b798a53"},'mynameisnabeelkhanjeemernstackdeveloper',{
  expiresIn:"2 seconds"
});
console.log(token);
const userVer= await jwt.verify(token,'mynameisnabeelkhanjeemernstackdeveloper');
console.log(userVer);
}
createToken();
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});

// let a = 5;
// let b =a ;
// b +=5;
// console.log(a,b);
// let a =[0,1,2,[0,2],[0,2,3,[5]]]
// let c= a.flat(Infinity);
// console.log(c);
// let a = 'name';

// let b= "nabeel";
// let c = {
//   [a]: b,

// }

// console.log(c);

// b.push(6)
// console.log(a,b);
//
