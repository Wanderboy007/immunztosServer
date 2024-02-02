import express from "express";
import { registerpractitionerdetails, checkloginpractitionerdetails } from "../connect.js"
const router = express.Router();

router.post("/register", async (req, res) => {
    const fromUser = req.body;
    const data = await registerpractitionerdetails(fromUser)
    res.send(data)
})

router.post("/login", async (req, res) => {
    const { UID, Password } = req.body;
    const data = await checkloginpractitionerdetails({ UID, Password })
    res.send(data)
})

router.get("/forgotPassword", async (req, res) => {
    res.send("hi")
})

export default router;