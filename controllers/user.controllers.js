const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.json(e.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      res.json(user)
    } catch (e) {
      res.json(e.message)
    }
  },
  registerUser: async (req, res) => {
    try {
      const { login, password, firstName, lastName, number } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({
        login: login,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        number: number,
      });

      res.json("Авторизация прошла успешно");
    } catch (e) {
      res.json(e.message);
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json("Неверный Email или пароль");
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json("Неверный Email или пароль");
      } 

      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      res.json({
        token: token
      })

    } catch (e) {
      res.json(e.message);
    }
  },
};
