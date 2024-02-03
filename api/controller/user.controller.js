import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createUser = (req, res, next) => {
  const newUser = new User(req.body);
  console.log(req.body);
  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    })
    .catch((err) => {
      console.log(err.message);
      next(errorHandler(500, err.message));
    });
};
