import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : res.send("Your are not logged in");

  const data = jwt.verify(token, "secretkey");
  console.log(data);

  data.role === "admin" ? next() : res.send("Your are not an admin");
};
