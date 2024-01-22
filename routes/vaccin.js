import express from "express";
import { giveBirthFile, giveonemonth } from "../connect.js";
const router = express.Router();
//give birth vaccin 




router.post("/birth", async (req, res) => {
    try {
        const {
            ChildUID,
            height,
            weight,
            Growthstatus,
            selectedCheckboxes,
            vaccineData,
            PractitionerUID
        } = req.body

        const data = {
            ChildUID,
            height,
            weight,
            Growthstatus,
            selectedCheckboxes,
            OpvZero: vaccineData[0].checked ? vaccineData[0].date : null,
            OpvZeroDelayReason: vaccineData[0].delayReason,
            HepB: vaccineData[1].checked ? vaccineData[1].date : null,
            HepBDelayReason: vaccineData[1].delayReason,
            Bcg: vaccineData[2].checked ? vaccineData[2].date : null,
            BcgDelayReason: vaccineData[2].delayReason,
            PractitionerUID
        }


        const a = await giveBirthFile(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});




router.post("/onemonth", async (req, res) => {
    try {
        const {
            ChildUID,
            height,
            weight,
            Growthstatus,
            vaccineData,
            PractitionerUID
        } = req.body

        const data = {
            ChildUID,
            height,
            weight,
            Growthstatus,
            OpvOne: vaccineData[0].checked ? vaccineData[0].date : null,
            OpvOneDelayReason: vaccineData[0].delayReason,
            PentaOne: vaccineData[1].checked ? vaccineData[1].date : null,
            PentaOneDelayReason: vaccineData[1].delayReason,
            RotaOne: vaccineData[2].checked ? vaccineData[2].date : null,
            RotaOneDelayReason: vaccineData[2].delayReason,
            PcvOne: vaccineData[3].checked ? vaccineData[3].date : null,
            PcvOneDelayReason: vaccineData[3].delayReason,
            IpvOne: vaccineData[4].checked ? vaccineData[4].date : null,
            IpvOneDelayReason: vaccineData[4].delayReason,
            PractitionerUID
        }


        const a = await giveonemonth(data);
        res.status(200).send(a);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});

export default router;



