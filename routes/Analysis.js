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


router.get('/noofbeneficiaries', async function (req, res) {
    // res.status(200).send("hi");
    async function noofbeneficiaries() {
        const query = `select count( distinct tbl.EachTableCount) from ( select ChildUID as EachTableCount from birth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from onemonth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from twomonth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from threemonths where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from ninemonths where practitionerUID = 'PID001' )tbl`;
        const values = Array(5).fill("PID001");
        const result = await pool.query(query, values);
        console.log(result[0]);
        res.status(200).send(result[0]);
    }
    noofbeneficiaries();
    res.status(404);
});


router.get('/noofbeneficiariesbetweenoneandtwoyearsofage', async function (req, res) {
    // res.status(200).send("hi");
    async function noofbeneficiariesbetweenoneandtwoyearsofage() {
        const query = `select count( distinct tbl.EachTableCount) from ( select ChildUID as EachTableCount from birth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from onemonth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from twomonth where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from threemonths where practitionerUID = 'PID001' UNION ALL select ChildUID as EachTableCount from ninemonths where practitionerUID = 'PID001' )tbl`;
        const values = Array(5).fill("PID001");
        const result = await pool.query(query, values);
        console.log(result[0]);
        res.status(200).send(result[0]);
    }
    noofbeneficiariesbetweenoneandtwoyearsofage();
    res.status(404);
});

router.get('/getcumulativenoofaparticularvaccine', async function (req, res) {
    // res.status(200).send("hi");
    async function getcumulativenoofaparticularvaccine() {
        const practitionerUID = "PID001";
        const query = `SELECT * FROM ( SELECT COUNT(OpvZero) FROM birth WHERE practitionerUID = ? UNION ALL SELECT COUNT(OpvOne) FROM onemonth WHERE practitionerUID = ?);`;
        const values = Array(2).fill(practitionerUID);

        const result = await pool.query(query, values);
        res.status(200).send(result[0]);
    }
    getcumulativenoofaparticularvaccine();
    res.status(404);
});


router.get('/getcumulativenoofbirth', async function (req, res) {
    // res.status(200).send("hi"); 
    const { practitionerUID } = req.query;
    // console.log(practitionerUID)
    async function getcumulativenoofopvzero() {
        const query1 = `select count(ChildUID) as opvzero from birth where OpvZero is not NULL and practitionerUID = ?`;
        const query2 = `select count(ChildUID) as HepB from birth where HepB is not NULL and practitionerUID = ?`;
        const query3 = `select count(ChildUID) as Bcg from birth where Bcg is not NULL and practitionerUID = ?`;
        // const values = Array(2).fill(practitionerUID);

        const result1 = await pool.query(query1, practitionerUID);
        const result2 = await pool.query(query2, practitionerUID);
        const result3 = await pool.query(query3, practitionerUID);
        res.status(200).send({ result: [{ "name": "OPV", count: result1[0][0].opvzero }, { "name": "HepB", count: result2[0][0].HepB }, { "name": "Bcg", count: result3[0][0].Bcg }] });
    }
    getcumulativenoofopvzero();
    res.status(404);
});

router.get('/getcumulativenoofoneMonth', async function (req, res) {
    // res.status(200).send("hi"); 
    const { practitionerUID } = req.query;
    // console.log(practitionerUID)
    async function getcumulativenoofopvzero() {
        const query1 = `select count(ChildUID) as OpvOne from onemonth where OpvOne is not NULL and practitionerUID = ?`;
        const query2 = `select count(ChildUID) as PentaOne from onemonth where PentaOne is not NULL and practitionerUID = ?`;
        const query3 = `select count(ChildUID) as RotaOne from onemonth where RotaOne is not NULL and practitionerUID = ?`;
        const query4 = `select count(ChildUID) as PcvOne from onemonth where PcvOne is not NULL and practitionerUID = ?`;
        const query5 = `select count(ChildUID) as IpvOne from onemonth where IpvOne is not NULL and practitionerUID = ?`;
        // const values = Array(2).fill(practitionerUID);

        const result1 = await pool.query(query1, practitionerUID);
        const result2 = await pool.query(query2, practitionerUID);
        const result3 = await pool.query(query3, practitionerUID);
        const result4 = await pool.query(query4, practitionerUID);
        const result5 = await pool.query(query5, practitionerUID);
        res.status(200).send({ result: [{ "name": "OpvOne", count: result1[0][0].OpvOne }, { "name": "PentaOne", count: result2[0][0].PentaOne }, { "name": "RotaOne", count: result3[0][0].RotaOne }, { "name": "PcvOne", count: result4[0][0].PcvOne }, { "name": "IpvOne", count: result5[0][0].IpvOne }] });
    }
    getcumulativenoofopvzero();
    res.status(404);
});



export default router;