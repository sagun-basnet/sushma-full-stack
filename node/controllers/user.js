import db from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const q = `SELECT * FROM user`;
  db.query(q, (err, result) => {
    if (err) return res.send({ message: "query garda error aayo", err });
    return res.send({ message: "Data fetched successfully", result });
  });
};

export const postData = (req, res) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const q = `INSERT INTO user (name, email, password) VALUES (?,?,?)`;
  db.query(q, [name, email, hashPassword], (err, result) => {
    if (err) return res.send({ message: "query garda error aayo", err });
    return res.send({ message: "Data inserted successfully", result });
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const q = `UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?`;
  db.query(q, [name, email, password, id], (err, result) => {
    if (err) return res.send({ message: "query garda error aayo", err });
    return res.send({ message: "Data updated successfully", result });
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const q = `delete from user where id = ?`;

  db.query(q, [id], (err, result) => {
    if (err) return res.send("Error aayo");
    return res.send("Delete vayo");
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const q = "SELECT * from user where email = ?";
  db.query(q, [email], (err, result) => {
    if (err) return res.send("error aayo", err);
    if (result.length === 0) {
      return res.send("User doesnot exist");
    }

    const ifPasswordRight = bcrypt.compareSync(password, result[0].password);

    const token = jwt.sign(
      { id: result[0].id, role: result[0].role },
      "secretkey"
    );

    if (ifPasswordRight) {
      const { password, ...others } = result[0];
      return res.send({ token, data: others });
    }
    return res.send(`Password is incorrect for user: ${result[0].email} `);
  });
};


