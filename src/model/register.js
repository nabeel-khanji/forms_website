const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    // required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});
employeeSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameisnabeelkhanjeemernstackdeveloper"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send(`the error part ${error}`);
    console.log(`the error part ${error}`);
  }
};
employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // const passwordHashed = await bcrypt.hash(password, 10);
    console.log(`current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`current password is ${this.password}`);
    this.confirmpassword = undefined;
  }
  next();
});
const Employee = mongoose.model("Register", employeeSchema);

module.exports = Employee;
