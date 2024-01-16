import express from "express";
import cors from "cors"
import { getuser, createUser, getuserId, regUser, checkUser, getmotherdetails, registerMotherDetails, addchild, getchild, getmotherSingledetails, giveBirthFile } from "./connect.js";
import sendEmail from "./mailus.js";

const app = express();
app.use(express.json());
app.use(cors());

import mysql from "mysql2";

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "b2fool",
    database: "immu",
  })
  .promise();



const verifyuser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.json({ Message: "We need token please give" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentation error" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};


app.get("/login", verifyuser, (req, res) => {
  console.log(req.email.email);
  return res.json({ status: "Success", email: req.email });

});


app.post("/login", async (req, res) => {
  const sql = "SELECT * FROM user Where Email = ? AND Password = ?";
  // console.log(req.body)
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "server side error" });
    }
    if (data.length > 0) {
      const email = data[0];
      const token = jwt.sign({ email }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ status: "Success" });
    } else {
      return res.json({ Message: "No record existed" });
    }
  });
  return res.json({ status: "Success", email: req.email })
});



// //Get ALL User
// app.get("/api/getuser", async (req, res) => {
//   const a = await getuser();
//   res.send(a);
// });

// //Forgot Password
// app.post("/api/forgetpass", async (req, res) => {
//   const { email, text } = req.body;
//   const otp = Math.random(5) * 10000;
//   const otp2 = Math.floor(otp)
//   console.log(otp2)
//   sendEmail(email, text)
//   res.status(201).send(`${otp2}`)
// })

// //Get Single User
// app.post("/api/getuserid", async (req, res) => {
//   const { name, password } = req.body;
//   const a = await getuserId(name, password);

//   if (!a) {
//     res.status(404).send("error")
//   }
//   res.send(a);
// });

// //Login ke liya
// app.post("/api/login", async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const a = await checkUser(name, password);
//     if (!a) {
//       res.status(404).send({ "status": "wrong password" })
//     }
//     res.status(200).send(true);
//   } catch (error) {
//     console.log(error)
//     res.status(404).send({ "status": "uid is not found" })
//   }
// });


//Get motherdetails
app.get("/api/motherdetails", async (req, res) => {
  const { MotherAdhar } = req.query;
  console.log(MotherAdhar)
  const a = await getmotherdetails(MotherAdhar)
  res.status(200).send(a);
});

//Get motherdetails
app.get("/api/motherSingledetails", async (req, res) => {
  const { MotherAdhar } = req.query;
  console.log(MotherAdhar)
  const a = await getmotherSingledetails(MotherAdhar)
  res.status(200).send(a);
});


//Register new user
app.post("/api/registerMotherdetails", async (req, res) => {
  try {

    const {
      motherName,
      contactNumber,
      MotherAge,
      Address,
      aadhaarNumber,
      lastMenstrualPeriod,
      expectedDeliveryDate,
      NumberOfPregnancies, } = req.body;

    const data = {
      motherName,
      contactNumber,
      MotherAge,
      Address: `${Address.country}+${Address.state}+${Address.district}+${Address.taluka}`,
      aadhaarNumber,
      lastMenstrualPeriod,
      expectedDeliveryDate,
      NumberOfPregnancies,
    }
    const a = await registerMotherDetails(data);
    res.status(200).send(a);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }

});


//get childdata 
app.get("/api/getchild", async (req, res) => {
  const { MotherAdhar } = req.query;
  // console.log(MotherAdhar)
  const a = await getchild(MotherAdhar)
  res.status(200).send(a);
})

//add child
app.post("/api/addchild", async (req, res) => {
  try {

    const {
      BirthWeight,
      CSection,
      ClinicalDelivery,
      DateOfBirth,
      HomeDelivery,
      Lastname,
      Middlename,
      MotherAdher,
      PerTerm,
      PlaceOfBirth,
      name
    } = req.body;

    const data = {
      BirthWeight,
      CSection,
      ClinicalDelivery,
      DateOfBirth,
      HomeDelivery,
      Lastname,
      Middlename,
      MotherAdher,
      PerTerm,
      PlaceOfBirth,
      name
    }

    const a = await addchild(data);
    res.status(200).send(a);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }

});

//give birth vaccin 
app.post("/api/vaccinBirth", async (req, res) => {
  try {

    const {
      ChildUID,
      OpvZero,
      OpvZeroDelayReason,
      HepB,
      HepBDelayReason,
      Bcg,
      BcgDelayReason,
      PractitionerUID,
    } = req.body;

    const data = {
      ChildUID,
      OpvZero,
      OpvZeroDelayReason,
      HepB,
      HepBDelayReason,
      Bcg,
      BcgDelayReason,
      PractitionerUID,
    }

    const a = await giveBirthFile(data);
    res.status(200).send(a);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }

});



app.listen(5000, () => {
  console.log("server is up");
});


