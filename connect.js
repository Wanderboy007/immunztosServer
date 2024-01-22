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

export async function getmotherdetails(findstring) {
  const a = await pool.query("SELECT * FROM motherdatabase WHERE Adhar LIKE ?", [`%${findstring}%`]);
  // const a = await pool.query("SELECT * FROM motherdatabase")
  // console.log(a[0]);
  return a[0];
}

export async function getmotherSingledetails(findstring) {
  const a = await pool.query("SELECT * FROM motherdatabase WHERE Adhar = ?", [findstring]);
  console.log(a);
  return a[0];
}

export async function addchild(data) {

  const ifANYchild = await pool.query("select COUNT(*) from childdata  where MotherAdhar =?", [data.MotherAdher])
  let myObject = ifANYchild[0][0]

  let countValue = myObject['COUNT(*)']

  let childcount = 1;
  childcount = childcount + countValue
  console.log(childcount)
  const a = await pool.query("INSERT INTO childdata(BirthWeight, CSection, ClinicalDelivery, DateOfBirth,HomeDelivery, Lastname, Middlename, MotherAdhar, PerTerm, PlaceOfBirth, name,ChildUID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [data.BirthWeight,
  data.CSection,
  data.ClinicalDelivery,
  data.DateOfBirth,
  data.HomeDelivery,
  data.Lastname,
  data.Middlename,
  data.MotherAdher,
  data.PerTerm,
  data.PlaceOfBirth,
  data.name,
  `${data.MotherAdher}0${childcount}`]);
  console.log(a[0]);
  return a[0];
}


export async function giveBirthFile(data) {
  const a = await pool.query("INSERT INTO birth (ChildUID, OpvZero, OpvZeroDelayReason, HepB, HepBDelayReason, Bcg, BcgDelayReason, PractitionerUID,height,weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)", [
    data.ChildUID,
    data.OpvZero,
    data.OpvZeroDelayReason,
    data.HepB,
    data.HepBDelayReason,
    data.Bcg,
    data.BcgDelayReason,
    data.PractitionerUID,
    data.height,
    data.weight]);

  const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['ONE MONTH', data.ChildUID]);
  console.log(b);

  // console.log(a[0]); 

  return a[0];
}


export async function giveonemonth(data) {
  const a = await pool.query(
    "INSERT INTO onemonth (ChildUID, OpvOne, OpvOneDelayReason, PentaOne, PentaOneDelayReason, RotaOne, RotaOneDelayReason, PcvOne, PcvOneDelayReason, IpvOne, IpvOneDelayReason, PractitionerUID, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.ChildUID,
      data.OpvOne,
      data.OpvOneDelayReason,
      data.PentaOne,
      data.PentaOneDelayReason,
      data.RotaOne,
      data.RotaOneDelayReason,
      data.PcvOne,
      data.PcvOneDelayReason,
      data.IpvOne,
      data.IpvOneDelayReason,
      data.PractitionerUID,
      data.height,
      data.weight
    ]
  );

  const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['TWO MONTHS', data.ChildUID]);

  console.log(b);

  return a[0];
}


export async function getchild(data) {
  const a = await pool.query("SELECT * FROM childdata where MotherAdhar=?", [data]);
  // console.log(a[0]);
  return a[0];
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


export async function registerMotherDetails(data) {
  const a = await pool.query("insert into motherdatabase(MotherName,Adhar,MotherAge,Address,ContactNumber) values(?,?,?,?,?);", [data.motherName, data.aadhaarNumber, data.MotherAge, data.Address, data.contactNumber]);
  return a[0];
}
