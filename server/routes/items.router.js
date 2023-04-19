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
            console.log("error getting profile:", err);
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
    .catch((err) => {
        console.log("error getting item details:", err);
        res.sendStatus(500);
    });
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
    .catch((err) => {
        console.log("error getting stock item details:", err);
        res.sendStatus(500);
    });
})

router.put('/mystock/:id', (req, res) => {
    
    const sqlText = `UPDATE "my_objects_table"
    SET "quantity_in_field" = $1, "quantity_owned" = $2, "stock_override_qty" = $3
    WHERE (mot_id = $4 AND user_id = $5);`
    const sqlParams = [req.body.qtyInField, req.body.qtyOwned, req.body.stockOverrideQty, req.params.id, req.user.id]
    
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(202)
    })
    .catch((err) => {
        console.log("error updating stock item:", err);
        res.sendStatus(500);
    });
})

router.put('/allitems/:id', (req, res) => {
    let b = req.body
    console.log(`in allitems`);
    
    const sqlText = `
    UPDATE "object"
    SET "part_name" = $1, "part_number" = $2, "description" = $3, "lead_time_weeks" = $4, "mttf_months" = $5
    WHERE "id" = $6;`
    
    const sqlParams = [b.partName, b.partNumber, b.description, b.estLeadTime, b.estMTTF, b.itemID.id]
    
    const sqlText2 = `
    UPDATE "object_suppliers" 
    SET "supplier_id" = $1
    WHERE "object_id" = $2;
    `

    const sqlParams2 = [b.supplierID, b.itemID.id]
    
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(202)
    })
    .catch((err) => {
        console.log(`Error updating object table in allitems put`, err);
        res.sendStatus(500)
    })

    pool.query(sqlText2, sqlParams2)
    .then((result) => {
        // res.sendStatus(202)
    })
    .catch((err => {
        console.log(`Error updating object_suppliers table in allitems put`, err);
        // res.sendStatus(500)
    }))
    
})


module.exports = router