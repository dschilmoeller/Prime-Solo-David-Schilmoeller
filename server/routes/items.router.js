const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/", (req, res) => {
    const sqlText = `SELECT * FROM "object";`;
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