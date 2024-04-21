import express from "express";
import { giveBirthFile, giveonemonth, getbirthdata, givetwomonths, givethreemonths, giveninemonth, givesixteenmonth, givesixyears } from "../connect.js";
const router = express.Router();


//give birth vaccin  
router.get("/birth", async (req, res) => {
    const { childuid } = req.query;
    const birthdata = await getbirthdata(childuid)
    res.send(birthdata)
})

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


// /onemonth

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


// /two months 

router.post('/twomonths', function (req, res) {
    try {
        const {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            PractitionerUID,
            vaccineData,
        } = req.body;

        const data = {
            ChildUID,
            height,
            huac,
            weight,
            PractitionerUID,
            Growthstatus,
            selectedCheckboxes,
            OpvTwo: vaccineData[0].checked ? vaccineData[0].date : null,
            OpvTwoDelayReason: vaccineData[0].delayReason,
            PentaTwo: vaccineData[1].checked ? vaccineData[1].date : null,
            PentaTwoDelayReason: vaccineData[1].delayReason,
            RotaTwo: vaccineData[2].checked ? vaccineData[2].date : null,
            RotaTwoDelayReason: vaccineData[2].delayReason,
        };
        const result = givetwomonths(data)


        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});


// /three months 

router.post('/threemonths', function (req, res) {

    try {
        const {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            vaccineData,
        } = req.body;

        const data = {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            OpvThree: vaccineData[0].checked ? vaccineData[0].date : null,
            OpvThreeDelayReason: vaccineData[0].delayReason,
            PentaThree: vaccineData[1].checked ? vaccineData[1].date : null,
            PentaThreeDelayReason: vaccineData[1].delayReason,
            RotaThree: vaccineData[2].checked ? vaccineData[2].date : null,
            RotaThreeDelayReason: vaccineData[2].delayReason,
            PcvTwo: vaccineData[3].checked ? vaccineData[3].date : null,
            PcvTwoDelayReason: vaccineData[3].delayReason,
            IpvTwo: vaccineData[4].checked ? vaccineData[4].date : null,
            IpvTwoDelayReason: vaccineData[4].delayReason,
        };

        const result = givethreemonths(data)
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});


// /nine months 

router.post('/ninemonths', function (req, res) {

    try {
        const {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            vaccineData,
            PractitionerUID
        } = req.body;

        const data = {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            PractitionerUID,
            MrOne: vaccineData[0].checked ? vaccineData[0].date : null,
            MrOneDelayReason: vaccineData[0].delayReason,
            JeOne: vaccineData[1].checked ? vaccineData[1].date : null,
            JeOneDelayReason: vaccineData[1].delayReason,
            VitaminAOne: vaccineData[2].checked ? vaccineData[2].date : null,
            VitaminAOneDelayReason: vaccineData[2].delayReason,
            PcvThree: vaccineData[3].checked ? vaccineData[3].date : null,
            PcvThreeDelayReason: vaccineData[3].delayReason,

        };
        const result = giveninemonth(data)

        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});
// /sixteen months 

router.post('/sixteenmonts', function (req, res) {

    try {
        const {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            vaccineData,
        } = req.body;

        const data = {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            DptBoosterOne: vaccineData[0].checked ? vaccineData[0].date : null,
            DptBoosterOneDelayReason: vaccineData[0].delayReason,
            VitaminATwo: vaccineData[1].checked ? vaccineData[1].date : null,
            VitaminATwoDelayReason: vaccineData[1].delayReason,
            MrTwo: vaccineData[2].checked ? vaccineData[2].date : null,
            MrTwoDelayReason: vaccineData[2].delayReason,
            JeTwo: vaccineData[3].checked ? vaccineData[3].date : null,
            JeTwoDelayReason: vaccineData[3].delayReason,
            OpvBooster: vaccineData[4].checked ? vaccineData[4].date : null,
            OpvBoosterDelayReason: vaccineData[4].delayReason,
        };
        const result = givesixteenmonth(data)

        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});


// /six years 

router.post('/sixyears', function (req, res) {
    res.status(200).send("all good");
    try {
        const {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            vaccineData,
            PractitionerUID
        } = req.body;

        const data = {
            ChildUID,
            height,
            huac,
            weight,
            Growthstatus,
            selectedCheckboxes,
            PractitionerUID,
            DptBoosterTwo: vaccineData[0].checked ? vaccineData[0].date : null,
            DptBoosterTwoDelayReason: vaccineData[0].delayReason,
        }
        const result = givesixyears(data)
        res.status(200).send(result);

    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }

});







export default router;