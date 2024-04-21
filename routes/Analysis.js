import express from "express";
// import { giveBirthFile, giveonemonth, getbirthdata, givetwomonths, givethreemonths, giveninemonth, givesixteenmonth, givesixyears } from "../connect.js";
import pool from "../connect.js"
const router = express.Router();


router.get('/practitionersession', async function (req, res) {
    // res.status(200).send("hi");
    async function practitionersession() {
        const a = await pool.query(`select sum(tbl.EachTableCount)
        from(
        select count(ChildUID) as EachTableCount from birth where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from onemonth where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from twomonth where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from threemonths where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from ninemonths where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from sixteenmonths where practitionerUID = 'UID'
        UNION ALL
        select count(ChildUID) as EachTableCount from sixyears where practitionerUID = 'UID'
        UNION ALL
        select ChildUID as EachTableCount from 10Years where practitionerUID = 'UID'
        UNION ALL
        select ChildUID as EachTableCount from 16Years where practitionerUID = 'UID'
        )tbl `);
        console.log(a[0]);
        res.status(200).send(a[0]);
    }
    practitionersession();
    res.status(404);
});


router.get('/noofbeneficiarieslessthanoneyearofage', async function (req, res) {
    // res.status(200).send("hi");
    async function noofbeneficiaries() {
        const a = await pool.query(`select count( distinct tbl.EachTableCount) from ( select ChildUID as EachTableCount from birth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from onemonth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from twomonth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from threemonths where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from ninemonths where practitionerUID = 'UID' )tbl`);
        console.log(a[0]);
        res.status(200).send(a[0]);
    }
    noofbeneficiaries();
    res.status(404);
});


router.get('/noofbeneficiariesbetweenoneandtwoyearsofage', async function (req, res) {
    // res.status(200).send("hi");
    async function noofbeneficiariesbetweenoneandtwoyearsofage() {
        const a = await pool.query(`select count( distinct tbl.EachTableCount) from ( select ChildUID as EachTableCount from birth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from onemonth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from twomonth where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from threemonths where practitionerUID = 'UID' UNION ALL select ChildUID as EachTableCount from ninemonths where practitionerUID = 'UID' )tbl`);
        console.log(a[0]);
        res.status(200).send(a[0]);
    }
    noofbeneficiariesbetweenoneandtwoyearsofage();
    res.status(404);
});

router.get('/getcumulativenoofaparticularvaccine', async function (req, res) {
    // res.status(200).send("hi");
    async function getcumulativenoofaparticularvaccine() {
        const practitionerUID = "PID001";
        const query = `SELECT SUM(OpvCount) AS TotalCount FROM ( SELECT COUNT(OpvZero) AS OpvCount FROM birth WHERE practitionerUID = ? UNION ALL SELECT COUNT(OpvOne) AS OpvCount FROM onemonth WHERE practitionerUID = ? ) AS combined_counts;`;
        const values = Array(2).fill(practitionerUID);

        const result = await pool.query(query, values);
        res.status(200).send(result);
    }
    getcumulativenoofaparticularvaccine();
    res.status(404);
});

export default router;