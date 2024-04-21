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

export async function getmotherdetails(findstring) {
  const a = await pool.query("SELECT * FROM motherdatabase WHERE Adhar LIKE ?", [`%${findstring}%`]);

  console.log(a[0]);
  return a[0];
}

export async function getmotherSingledetails(findstring) {
  const a = await pool.query("SELECT * FROM motherdatabase WHERE Adhar = ?", [findstring]);
  console.log(a);
  return a[0];
}

export async function getbirthdata(data) {
  const a = await pool.query("SELECT * FROM birth WHERE ChildUID = ?", [data]);
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

  return b[0];
}


export async function givetwomonths(data) {
  const a = await pool.query(
    "INSERT INTO twomonth (ChildUID, OpvTwo,OpvTwoDelayReason, PentaTwo, PentaTwoDelayReason, RotaTwo, RotaTwoDelayReason, PractitionerUID, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.ChildUID,
      data.OpvTwo,
      data.OpvTwoDelayReason,
      data.PentaTwo,
      data.PentaTwoDelayReason,
      data.RotaTwo,
      data.RotaTwoDelayReason,
      data.PractitionerUID,
      data.height,
      data.weight
    ]
  );

  const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['TWO MONTHS', data.ChildUID]);

  console.log(b);

  return a[0];
}


export async function givethreemonths(data) {
  try {
    const a = await pool.query(
      "INSERT INTO threemonths (ChildUID, OpvThree, OpvThreeDelayReason, PentaThree, PentaThreeDelayReason, RotaThree, RotaThreeDelayReason, PractitionerUID, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.ChildUID,
        data.OpvThree,
        data.OpvThreeDelayReason,
        data.PentaThree,
        data.PentaThreeDelayReason,
        data.RotaThree,
        data.RotaThreeDelayReason,
        data.PractitionerUID,
        data.height,
        data.weight
      ]
    );

    const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['THREE MONTHS', data.ChildUID]);

    console.log(b);

    return b[0];
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}



export async function giveninemonth(data) {
  try {
    const a = await pool.query(
      "INSERT INTO ninemonths (ChildUID, MrOne, MrOneDelayReason, JeOne, JeOneDelayReason, VitaminAOne, VitaminAOneDelayReason, PcvThree, PcvThreeDelayReason, PractitionerUID, height, huac, weight, Growthstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.ChildUID,
        data.MrOne,
        data.MrOneDelayReason,
        data.JeOne,
        data.JeOneDelayReason,
        data.VitaminAOne,
        data.VitaminAOneDelayReason,
        data.PcvThree,
        data.PcvThreeDelayReason,
        data.PractitionerUID,
        data.height,
        data.huac,
        data.weight,
        data.Growthstatus
      ]
    );

    const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['SIXTEEN MONTHS', data.ChildUID]);

    console.log(b);

    return b[0];
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}

export async function givesixteenmonth(data) {
  try {
    const a = await pool.query(
      "INSERT INTO sixteenmonths (ChildUID, MrTwo, MrTwoDelayReason, JeTwo, JeTwoDelayReason, VitaminATwo, VitaminATwoDelayReason, OpvBooster, OpvBoosterDelayReason, PractitionerUID, height, huac, weight, Growthstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.ChildUID,
        data.MrTwo,
        data.MrTwoDelayReason,
        data.JeTwo,
        data.JeTwoDelayReason,
        data.VitaminATwo,
        data.VitaminATwoDelayReason,
        data.OpvBooster,
        data.OpvBoosterDelayReason,
        data.PractitionerUID,
        data.height,
        data.huac,
        data.weight,
        data.Growthstatus
      ]
    );

    const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['SIX YEARS', data.ChildUID]);

    console.log(b);

    return b[0];
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}

export async function givesixyears(data) {
  try {
    const a = await pool.query(
      "INSERT INTO sixyears (ChildUID, DptBoosterTwo, DptBoosterTwoDelayReason, PractitionerUID, height, huac, weight, Growthstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.ChildUID,
        data.DptBoosterTwo,
        data.DptBoosterTwoDelayReason,
        data.PractitionerUID,
        data.height,
        data.huac,
        data.weight,
        data.Growthstatus
      ]
    );

    const b = await pool.query("UPDATE childdata SET GrowthStatus = ? WHERE ChildUID = ?", ['SIX YEARS', data.ChildUID]);

    console.log(b);

    return b[0];
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}




export async function getchild(data) {
  const a = await pool.query("SELECT * FROM childdata where MotherAdhar=?", [data]);
  // console.log(a[0]);
  return a[0];
}

export async function getchildfromchilduid(data) {
  const a = await pool.query("SELECT * FROM childdata where ChildUID=?", [data]);
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





export async function registerpractitionerdetails(data) {

  const salt = await bcrypt.genSalt(5)
  const hashed = await bcrypt.hash(data.Password, salt)

  const RandomOTP = Math.round(Math.random(2) * 10000)
  const a = pool.query("INSERT INTO practitionerdetails (FirstName, MiddleName, LastName, PractitionerUID, Phone, Email, Password, InstitutionID, MedicalOfficerID,practitionerOTP)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [data.FirstName, data.MiddleName, data.LastName, data.PractitionerUID, data.Phone, data.Email, hashed, data.InstitutionID, data.MedicalOfficerID, RandomOTP]);

  return a;
}


export async function checkloginpractitionerdetails(data) {

  // const salt = await bcrypt.genSalt(5)
  // const hashed = await bcrypt.hash(data.Password, salt)

  // const RandomOTP = Math.round(Math.random(2) * 10000)
  // const a = pool.query("INSERT INTO practitionerdetails (FirstName, MiddleName, LastName, PractitionerUID, Phone, Email, Password, InstitutionID, MedicalOfficerID,practitionerOTP)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [data.FirstName, data.MiddleName, data.LastName, data.PractitionerUID, data.Phone, data.Email, hashed, data.InstitutionID, data.MedicalOfficerID, RandomOTP]);

  const a = await pool.query("SELECT FirstName FROM practitionerdetails WHERE PractitionerUID = ?", [data.UID])
  if (a[0].length === 0) {
    return false
  }
  else {
    return true
  }
}