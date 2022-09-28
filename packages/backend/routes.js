const express = require("express");
const router = express.Router();
const cors = require("cors");

const authController = require("./modules/auth");

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3002",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin?.replace(/\/$/, "")) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
};

router.all("/api/*", cors(corsOptions));

/**
 *  User Management
 */

router.get("/api/user/:address", (req, res, next) => {
  authController.get(req, res, next);
});

router.post("/api/me/profile", [authController.authenticateToken], (req, res, next) => {
  authController.myProfile(req, res, next);
});

router.post("/api/auth/check", [authController.authenticateToken], (req, res, next) => {
  authController.check(req, res, next);
});

router.post("/api/login", (req, res, next) => {
  authController.login(req, res, next);
});

router.post("/api/user/register", [authController.authenticateToken], (req, res, next) => {
  authController.register(req, res, next);
});

router.post(
  "/api/user/update",
  [authController.authenticateToken],
  (req, res, next) => {
    authController.update(req, res, next);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

/**
 *  Public
 */
router.get("/*", (req, res) => {
  res.send("test api");
});

module.exports = router;
