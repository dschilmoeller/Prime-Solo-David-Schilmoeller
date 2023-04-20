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

router.get('/fetchdetail/:id', (req, res) => {
    const sqlText = `SELECT "object"."id", "part_name", "part_number", "description", "object_type_id", "mttf_months", "lead_time_weeks", "supplier_id", "supplier_name" from object 
                        JOIN suppliers ON suppliers.id = object.supplier_id
                        WHERE object.id=$1;`
    
    const sqlParams = [Number(req.params.id)]

    // console.log(`query:`, sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.send(result.rows)
        // console.log(`result:`, result.rows);
    })
    .catch((err) => {
        console.log("error getting item details:", err);
        res.sendStatus(500);
    });
})

router.get('/mystock/:id', (req, res) => {
    const sqlText = `SELECT * from my_objects_table 
                        JOIN object ON object.id = my_objects_table.object_id
                        JOIN suppliers ON suppliers.id = object.supplier_id
                        WHERE mot_id=$1`
    
    const sqlParams = [Number(req.params.id)]

    // console.log(`query:`, sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log("error getting stock item details:", err);
        res.sendStatus(500);
    });
})

router.get('/get/fetchitemtypes/', (req, res) => {
    const sqlText = `SELECT * FROM "object_type_table"`
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

router.get('/supplierdetails/:id', (req, res) => {
    const sqlText = `SELECT * from "suppliers" WHERE id=$1`
    const sqlParams = [req.params.id]

    pool.query(sqlText, sqlParams)
    .then(result => {
        res.send(result.rows)
    })
    .catch(error => {
      res.sendStatus(500)  
      console.log(`Error fetching supplier details`, error);
    })
    
})

router.get('/fetchitemsbysupplier/:id', (req, res) => {
    const sqlText = `SELECT * FROM "object"
    
    WHERE "supplier_id" = $1`
    const sqlParams = [req.params.id]

    pool.query(sqlText, sqlParams)
    .then((result) => {
        console.log(`results`, result.rows);
        res.send(result.rows)
    })
    .catch(error => {
        res.sendStatus(500)
        console.log(`Error fetching items by supplier:`, error);
    })
})

router.put('/mystock/:id', (req, res) => {
    
    const sqlText = `UPDATE "my_objects_table"
    SET "quantity_in_field" = $1, "quantity_owned" = $2, "stock_override" = $3, "stock_override_qty" = $4
    WHERE (mot_id = $5 AND user_id = $6);`
    const sqlParams = [req.body.qtyInField, req.body.qtyOwned, req.body.stockOverride, req.body.stockOverrideQty, req.params.id, req.user.id]
    
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
    // console.log(`in allitems`);
    
    const sqlText = `
    UPDATE "object"
    SET "part_name" = $1, "part_number" = $2, "description" = $3, "lead_time_weeks" = $4, "mttf_months" = $5, "supplier_id" = $6
    WHERE "id" = $7;`
    
    const sqlParams = [b.partName, b.partNumber, b.description, b.estLeadTime, b.estMTTF, b.supplierID, b.itemID.id]
    
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(202)
    })
    .catch((err) => {
        console.log(`Error updating object table in allitems put`, err);
        res.sendStatus(500)
    })
})

router.post('/addtostock/', (req, res) => {
    const sqlText = `INSERT INTO "my_objects_table" 
    ("user_id", "object_id", "quantity_in_field", "quantity_owned", "stock_override", "stock_override_qty") 
    VALUES ($1, $2, $3, $4, $5, $6)`
    const sqlParams = [req.user.id, req.body.object_id, req.body.qtyInField, req.body.qtyOwned, req.body.stockOverride, req.body.stockOverrideQty]

    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log(`error adding item to stock`, err);
        res.sendStatus(500)
    })
})

// don't forget to make this check user type for admin status
// not just logged in or not
// {Adding items to master list}
router.post('/additemtomasterlist/', (req, res) => {
    console.log(`In additem to master list`);
    let b = req.body
    
    let sqlParams = [b.partName, b.partNumber, b.partDescription, b.objectTypeID, b.mttfMonths, b.leadTimeWeeks, b.supplierID]
    
    let sqlText = `
    INSERT INTO "object" ("part_name", "part_number", "description", "object_type_id", "mttf_months", "lead_time_weeks", "supplier_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(200)
    })
    .catch((err => {
        console.log(`Error adding item to "object": `, err);
        res.sendStatus(500)
    }))
})

router.delete('/deletefrommystock/:id', (req, res) => {
    let sqlText = `DELETE FROM "my_objects_table" WHERE (mot_id=$1 AND user_id=$2)`
    let sqlParams = [req.params.id, req.user.id]
    pool.query(sqlText, sqlParams)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(error => {
        res.sendStatus(500)
        console.log(`Error deleting item from my stock:`, error);
    })
})

router.delete('/deleteitemfromallitems/:id', (req, res) => {
    let sqlText = `DELETE FROM "object" WHERE (id=$1)`
    let sqlParams = [req.params.id]
    pool.query(sqlText, sqlParams)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(error => {
        res.sendStatus(500)
        console.log(`Error deleting item from my stock:`, error);
    })
})
module.exports = router