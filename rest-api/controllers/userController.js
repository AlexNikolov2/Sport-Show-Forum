const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { COOKIE_NAME, SALT_ROUNDS } = require("../config");
const { createToken } = require("../utils/jwt");
const isLogged = require("../middlewares/isLogged");
const {
  createUser,
  getUserById,
  getUserByEmail,
} = require("../services/userService");

const router = Router();

router.post(
  "/login",
  body("email").trim().isEmail().withMessage("Email is invalid!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const errors = validationResult(req)
        .array()
        .map((x) => x.msg);

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      const user = await getUserById(email);
      if (!user) throw new Error("Invalid email or password.");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error("Invalid email or password");

      const payload = removePass(user);

      const token = createToken({ id: user._id });
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.status(200).send(payload);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  }
);

router.post(
  "/register",
  body("email").trim().isEmail().withMessage("Email is invalid!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const errors = validationResult(req)
        .array()
        .map((x) => x.msg);

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      const user = await getUserById(email);
      if (user) throw new Error("User already exists!");

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      user = await createUser({ email, password: hashedPassword });

      const payload = removePass(user);

      const token = createToken({ id: user._id });
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.status(200).send(payload);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  }
);

router.get("/logout", isLogged(), (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(204).send({ message: "Logged out successfully" });
});
