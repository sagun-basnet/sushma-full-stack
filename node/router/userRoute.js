import express from "express";
import {
  deleteUser,
  getUser,
  login,
  postData,
  updateUser,
} from "../controllers/user.js";
import { isAdmin } from "../middleware/isAuth.js";

const route = express.Router();

route.get("/get-user", isAdmin, getUser);

route.post("/post-user", postData);
route.post("/update-user/:id", updateUser);
route.post("/delete-user/:id", deleteUser);
route.post("/login", login);

export default route;
