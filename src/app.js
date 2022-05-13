const express = require("express");
const hbs = require("hbs");
const async = require("hbs/lib/async");
const path = require("path");
require("./db/con");
const Employee = require("./model/register");
const port = process.env.PORT || 3000;
const app = express();
const public_path = path.join(__dirname, "../public");
const partial_path = path.join(__dirname, "../template/partials");
const view_path = path.join(__dirname, "../template/views");

console.log(`${public_path}\n${partial_path}\n${view_path}`);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(public_path));
app.set("view engine", "hbs");
app.set("views", view_path);

hbs.registerPartials(partial_path);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
  
if (req.body.password===req.body.confirmpassword) {  const result = await Employee(req.body);
  // console.log(result);
  const addUser = await result.save();
  console.log(addUser);
  console.log(result.name);
  res.render("index",{result :result});

}else{
  res.send('password not match');
}

  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/login", async (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
