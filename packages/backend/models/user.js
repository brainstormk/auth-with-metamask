const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: { type: String, lowercase: true },
  nonce: { type: Number, default: Math.floor(Math.random() * 1000000) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.index({ address: 1 }, { unique: true });
userSchema.index({ name: "text" });

userSchema.pre("update", function (next) {
  this.getUpdate().$set.updatedAt = new Date();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
