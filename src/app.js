require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/con");
const router= require("./router/routers")
const port = process.env.PORT || 3000;
const app = express();
const public_path = path.join(__dirname, "../public");
const partial_path = path.join(__dirname, "../template/partials");
const view_path = path.join(__dirname, "../template/views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(public_path));
app.use(router);
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partial_path);
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
