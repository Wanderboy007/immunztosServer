import express from "express";
import cors from "cors"
import { getuser, createUser, getuserId, regUser, checkUser } from "./connect.js";
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
  //hat be 
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
app.post("/api/check", async (req, res) => {
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


//Register new user
app.post("/api/reguser", async (req, res) => {
  const { name, middlename, lastname, phone, email, password } = req.body;
  const a = await regUser(name, middlename, lastname, phone, email, password);
  res.status(200).send(a);
});

app.listen(5000, () => {
  console.log("server is up");
});


