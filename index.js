import express from "express";
import cors from "cors"
import { getuser, createUser, getuserId, regUser, checkUser, getmotherdetails, registerMotherDetails, addchild, getchild } from "./connect.js";
import sendEmail from "./mailus.js";

const app = express();
app.use(express.json());
app.use(cors());


//Get ALL User
app.get("/api/getuser", async (req, res) => {
  const a = await getuser();
  res.send(a);
});

//Forgot Password
app.post("/api/forgetpass", async (req, res) => {
  const { email, text } = req.body;
  const otp = Math.random(5) * 10000;
  const otp2 = Math.floor(otp)
  console.log(otp2)
  sendEmail(email, text)
  res.status(201).send(`${otp2}`)
})

//Get Single User
app.post("/api/getuserid", async (req, res) => {
  const { name, password } = req.body;
  const a = await getuserId(name, password);

  if (!a) {
    res.status(404).send("error")
  }
  res.send(a);
});

//Login ke liya
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const a = await checkUser(name, password);
    if (!a) {
      res.status(404).send({ "status": "wrong password" })
    }
    res.status(200).send(true);
  } catch (error) {
    console.log(error)
    res.status(404).send({ "status": "uid is not found" })
  }
});


//Get mother details
app.get("/api/motherdetails", async (req, res) => {
  const { adhar } = req.query;
  console.log(adhar)
  const a = await getmotherdetails(adhar)
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
//get child data 
app.get("/api/addchild", async (req, res) => {
  const { MotherAdhar } = req.query;
  console.log(MotherAdhar)
  const a = await getchild(MotherAdhar)
  res.status(200).send(a);
})

app.post("/api/addchild", async (req, res) => {
  try {

    const {
      ChildAdhar,
      ChildName,
      ChildNumber,
      DateOfBirth,
      MotherAdhar,
      DateOfRegirestion
    } = req.body;

    const data = {
      ChildAdhar,
      ChildName,
      ChildNumber,
      DateOfBirth,
      MotherAdhar,
      DateOfRegirestion
    }

    const a = await addchild(data);
    res.status(200).send(a);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }

});

app.listen(5000, () => {
  console.log("server is up");
});


