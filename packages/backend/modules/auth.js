const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var ethSignUtil = require("eth-sig-util");
var ethereumjsUtil = require("ethereumjs-util");
const ethers = require("ethers");

const config = require("../config");
const BaseModule = require("./base");
const User = require("../models/user");

module.exports = BaseModule.extend({
  name: "auth.module",

  get: async function (req, res) {
    if (!req.params.address) return res.send({ status: false, message: "Address is missing" });
    if (!ethers.utils.isAddress(req.params.address)) return res.send({ status: false, message: "Invalid address" });

    User.findOne({ address: req.params.address }, { _id: 0, __v: 0 }, async (err, user) => {
      if (err) return res.send({ status: false, message: err.message });

      if (!user) {
        user = new User({
          address: req.params.address,
          nonce: Math.floor(Math.random() * 1000000),
        });
        await user.save();
      }

      res.send({
        status: true,
        user: {
          nonce: user.nonce,
          address: user.address,
        },
      });
    }).lean();
  },

  myProfile: async function(req, res) {
    return res.send({
      address: req.user.address,
      name: req.user.name,
      email: req.user.email,
      isRegistered: !!(req.user.name)
    })
  },

  check: async function (req, res) {
    return res.send({ status: true });
  },

  update: async function (req, res) {
    console.log("update reaches");
    if (!req.body.address) return res.send({ status: false, message: "No address" });

    const email = req.body.email;

    User.findOne({ address: req.body.address.toLowerCase() }, async (err, user) => {
      if (err) return res.send({ status: false, message: err.message });
      if (!user) return res.send({ status: false, message: "User not found" });

      if (email && email != user.email) {
        let otherUser = await User.findOne({ email: email, address: { $ne: req.body.address.toLowerCase() } });
        if (otherUser) return res.send({ status: false, message: "Email already used" });

        user.email = email;
      }

      if (req.body.name) user.name = req.body.name;
      await user.save();

      res.send({ status: true });
    });
  },

  login: async function (req, res) {
    let { address, signature } = req.body;
    if (!address || !signature) {
      return res.status(400).send({ message: "invalid params" });
    }

    address = address.toLowerCase().trim();

    var user = await User.findOne({ address: address });
    if (!user) {
      return res
        .status(401) //401 here
        .send({ message: "Signature verification failed" });
    }

    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    const msgBufferHex = ethereumjsUtil.bufferToHex(Buffer.from(msg, "utf8"));
    const publicAddress = ethSignUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    // The signature verification is successful if the address found with
    // ecrecover matches the initial publicAddress
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      user.nonce = Math.floor(Math.random() * 1000000);
      user.last_login = new Date();
      await user.save();

      var token = jwt.sign({ data: user.address }, config.secret, { expiresIn: "60m" }); // expireIn 1month
      return res.send({ token: token });
    } else {
      return res.status(401).send({ error: "Signature verification failed" });
    }
  },

  register: async function (req, res) {
    if (!req.body.address || !req.body.email || !req.body.name) {
      return res.status(400).send("Please fill information");
    }

    const email = req.body.email;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email) && email != "") {
      return res.send({ status: false, message: "Invalid email" });
    }

    User.findOne({ address: req.body.address.toLowerCase() }, async (err, user) => {
      if (err) return res.send({ status: false, message: err.message });
      if (!user)
        return res.send({ status: false, message: "User not found. Please refresh and re-submit your information" });

      if (email && email != user.email) {
        let otherUser = await User.findOne({ email: email, address: { $ne: req.body.address.toLowerCase() } });
        if (otherUser) return res.send({ status: false, message: "Email already used" });
      }

      user.email = email;
      user.name = req.body.name;
      await user.save();

      return res.send({status: true})
    });
  },
});
