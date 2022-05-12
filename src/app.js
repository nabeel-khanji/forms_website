const express = require("express");
const hbs= require("hbs");
const path = require("path");
require("./db/con");
const port = process.env.PORT || 3000;
const app = express();
const public_path= path.join(__dirname,"../public");
const partial_path = path.join(__dirname,"../template/partials");
const view_path = path.join(__dirname,"../template/views");

console.log(`${public_path}\n${partial_path}\n${view_path}`);
app.use(express.static(public_path));
app.set('view engine','hbs');
app.set('views',view_path);

hbs.registerPartials(partial_path);
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
