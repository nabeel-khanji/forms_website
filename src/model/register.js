const bcrypt = require("bcryptjs");
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
    required: true,
  },
});
employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // const passwordHashed = await bcrypt.hash(password, 10);
    console.log(`current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`current password is ${this.password}`);
    this.confirmpassword=undefined;
    
  }
  next();
});
const Employee = mongoose.model("Register", employeeSchema);

module.exports = Employee;
