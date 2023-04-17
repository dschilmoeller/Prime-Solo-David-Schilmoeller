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
    // const sqlText = `SELECT my_objects_table.id, user_id, part_name, part_number, object_type, mttf_months, lead_time_weeks,
    // description, quantity_in_field, quantity_owned, quantity_to_order, stock_override, stock_override_qty`
    console.log(`In fetchmystock`);
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
module.exports = router