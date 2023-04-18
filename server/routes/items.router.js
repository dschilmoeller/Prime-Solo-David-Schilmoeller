const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/fetchallitems", (req, res) => {
    const sqlText = `SELECT object.id, part_name, part_number, object_type, mttf_months, lead_time_weeks, description 
    FROM "object"
    JOIN "object_type_table" ON object_type_table.id = object.object_type_id
    ORDER BY part_name ASC;`;
    pool
        .query(sqlText)
        .then((result) => {
            res.send(result.rows);
            // console.log(result.rows);
        })
        .catch((err) => {
            console.log("error getting all:", err);
            res.sendStatus(500);
        });
});

router.get("/fetchmystock", (req, res) => {
    // console.log(`In fetchmystock`);
    const sqlText = `SELECT * FROM "my_objects_table"
    JOIN "object" ON object.id = my_objects_table.object_id
    JOIN "object_type_table" ON object_type_table.id = object.object_type_id
    ORDER BY part_name ASC;`;
    pool
        .query(sqlText)
        .then((result) => {
            res.send(result.rows);
            // console.log(result.rows);
        })
        .catch((err) => {
            console.log("error getting all:", err);
            res.sendStatus(500);
        });
});

router.get("/fetchsuppliers", (req, res) => {
    // console.log(`In fetchsuppliers`);
    const sqlText = `SELECT * FROM "suppliers"`
    pool
        .query(sqlText)
        .then((result) => {
            res.send(result.rows);
            // console.log(result.rows);
        })
        .catch((err) => {
            console.log("error getting suppliers:", err);
            res.sendStatus(500);
        });
});

router.get ('/fetchProfile', (req, res) => { 
    const sqlText = `SELECT first_name, last_name, user_email, user_type FROM "user"`
    pool
        .query(sqlText)
        .then((result) => {
            res.send(result.rows);
            // console.log(result.rows);
        })
        .catch((err) => {
            console.log("error getting suppliers:", err);
            res.sendStatus(500);
        });
})

router.get('/:id', (req, res) => {
    const sqlText = `SELECT * from object 
                        JOIN object_suppliers ON object.id = object_suppliers.object_id
                        JOIN suppliers ON suppliers.id = object_suppliers.supplier_id
                        WHERE object.id=$1;`
    
    const sqlParams = [Number(req.params.id)]

    console.log(`query:`, sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.send(result.rows)
        console.log(`result:`, result.rows);
    })
})

router.get('/mystock/:id', (req, res) => {
    const sqlText = `SELECT * from my_objects_table 
                        JOIN object ON object.id = my_objects_table.object_id
                        JOIN object_suppliers ON object.id = object_suppliers.object_id
                        JOIN suppliers ON suppliers.id = object_suppliers.supplier_id
                        WHERE mot_id=$1`
    
    const sqlParams = [Number(req.params.id)]

    console.log(`query:`, sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.send(result.rows)
        console.log(`result:`, result.rows);
    })
})


module.exports = router