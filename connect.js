import mysql from "mysql2";
import bcrypt from 'bcrypt'

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "b2fool",
    database: "immu",
  })
  .promise();


export async function getuser() {
  const a = await pool.query("select * from user");
  console.log(a[0]);
  return a;
}

export async function getuserId(insertId, password) {
  const a = await pool.query("select * from user where name=?", [insertId]);
  console.log(a);

  return a;
}

export async function checkUser(insertId, password) {
  const a = await pool.query("select * from user where name=?", [insertId]);

  const k = a[0];
  console.log(k[0].password)

  const isthere = await bcrypt.compare(password, k[0].password);


  return isthere;

}


export async function createUser(name, password) {
  const salt = await bcrypt.genSalt(5)
  const hashed = await bcrypt.hash(password, salt)

  const [a] = await pool.query("INSERT INTO user(name,password) VALUES(?,?);", [name, hashed]);
  // console.log(a.insertId)

  const user = getuserId(a.insertId)

  return user;
}


export async function regUser(name, middlename, lastname, phone, email, password) {

  const salt = await bcrypt.genSalt(5)
  const hashed = await bcrypt.hash(password, salt)

  const a = await pool.query("INSERT INTO user(name, middlename, lastname, phone, email, password) VALUE(?,?,?,?,?,?);", [name, middlename, lastname, phone, email, hashed]);
  // console.log(a.insertId)

  // const user = getuserId(a.insertId)

  return a;
}
