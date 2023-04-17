const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/", (req, res) => {
    const sqlText = `SELECT object.id, part_name, part_number, object_type, mttf_months, lead_time_weeks, description 
    FROM "object"
    JOIN "object_type_table" ON object_type_table.id = object.object_type_id;`;
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