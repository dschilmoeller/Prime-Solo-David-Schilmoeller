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
    const sqlText = `SELECT * FROM "my_objects_table"
    JOIN "object" ON object.id = my_objects_table.object_id
    JOIN "object_type_table" ON object_type_table.id = object.object_type_id
    WHERE user_id = $1
    ORDER BY quantity_to_order DESC;`;
    const sqlParams = Number(req.user.id)
    
    pool
        .query(sqlText, [sqlParams])
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
    const sqlText = `SELECT * FROM "suppliers" ORDER BY supplier_name ASC`
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

router.get('/fetchProfile', (req, res) => {
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

            res.send(result.rows)
        })
        .catch(error => {
            res.sendStatus(500)
            console.log(`Error fetching items by supplier:`, error);
        })
})

router.get('/fetchallusers', (req, res) => {
    if (req.user.user_type === 1) {
        let sqlText = `select "user".id, username, user_email, user_type_name FROM "user"
        JOIN user_types_table ON user_types_table.id = "user".user_type
        ORDER BY username ASC`
        pool.query(sqlText)
            .then((result) => {
                res.send(result.rows)
            })
            .catch(error => {
                res.sendStatus(500)
                console.log(`Error fetching all users`, error);
            })
    } else {
        res.sendStatus(403)
    }
})

router.get('/fetchusertypes', (req, res) => {
    const sqlText = `SELECT * FROM user_types_table`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch(error => {
            res.sendStatus(500)
            console.log(`Error fetching user types`, error);
        })

})

router.put('/mystock/:id', (req, res) => {
    console.log(`req.body.quanttoorder`, req.body.newQuantityToOrder);
    const sqlText = `UPDATE "my_objects_table"
    SET "quantity_in_field" = $1, "quantity_owned" = $2, "stock_override" = $3, "stock_override_qty" = $4, "quantity_to_order" = $7
    WHERE (mot_id = $5 AND user_id = $6);`
    const sqlParams = [req.body.qtyInField, req.body.qtyOwned, req.body.stockOverride, req.body.stockOverrideQty, req.params.id, req.user.id, req.body.newQuantityToOrder]

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
    // console.log(`req.body:`, req.body);

    const sqlText = `
    UPDATE "object"
    SET "part_name" = $1, "part_number" = $2, "description" = $3, "lead_time_weeks" = $4, "mttf_months" = $5, "supplier_id" = $6
    WHERE "id" = $7;`

    const sqlParams = [b.partName, b.partNumber, b.description, b.estLeadTime, b.estMTTF, b.supplierID, b.itemID]

    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch((err) => {
            console.log(`Error updating object table in allitems put`, err);
            res.sendStatus(500)
        })
})

router.put('/setsupplierdetails/:id', (req, res) => {

    let b = req.body
    const sqlText = `
    UPDATE "suppliers"
    SET "supplier_name" = $1, "supplier_address" = $2, "supplier_email" = $3, "supplier_phone" = $4,"supplier_url" = $5, "primary_contact_name" = $6, "primary_contact_phone" = $7, "primary_contact_email" = $8
    WHERE "id" = $9;`
    const sqlParams = [b.supplier_name, b.supplier_address, b.supplier_email, b.supplier_phone, b.supplier_url, b.primary_contact_name, b.primary_contact_phone, b.primary_contact_email, b.updateSupplierID]
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch((err) => {
            console.log(`error updating supplier details:`, err);
            res.sendStatus(500)
        })
})

router.put('/setprofiledetails', (req, res) => {
    let b = req.body
    const sqlText = `UPDATE "user" 
    set username =$1, first_name = $2, last_name = $3, 
        user_email = $4, user_type = $5, supplier_company_name = $6, 
        supplier_company_address = $7, supplier_email = $8, supplier_company_phone = $9, 
        supplier_company_url = $10
        WHERE id = ${req.user.id}`
    const sqlParams = [b.username, b.first_name, b.last_name,
    b.user_email, b.user_type, b.supplier_name,
    b.supplier_address, b.supplier_email, b.supplier_phone,
    b.supplier_url]
    pool.query(sqlText, sqlParams)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`Error updating profile details:`, err);
        })

})

router.put('/setusertype/', (req, res) => {
    if (req.user.user_type === 1) {
        let sqlParams = []
        if (req.body.type === 'Master Admin') {
            sqlParams = [1, req.body.target]
        } else if (req.body.type === 'Supplier Admin') {
            sqlParams = [2, req.body.target]
        } else if (req.body.type === 'Supplier') {
            sqlParams = [3, req.body.target]
        } else if (req.body.type === 'User') {
            sqlParams = [4, req.body.target]
        }
        const sqlText = `UPDATE "user" set "user_type" = $1 WHERE id = $2`
        pool.query(sqlText, sqlParams)
            .then((response) => {
                res.sendStatus(200)
            })
            .catch(err => {
                console.log(`Error updating user type:`, err);
            })
    }
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

// check for user type for admin status
// {adding supplier to supplier list}
router.post('/addsupplier', (req, res) => {
    let b = req.body

    let sqlText = `
    INSERT INTO suppliers (supplier_name, supplier_address, supplier_email, supplier_phone, supplier_url, primary_contact_name, primary_contact_phone, primary_contact_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `
    let sqlParams = [b.supplier_name, b.supplier_address, b.supplier_email,
    b.supplier_phone, b.supplier_url, b.primary_contact_name,
    b.primary_contact_phone, b.primary_contact_email]

    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
            console.log(`Error adding supplier:`, err);
        })


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

router.delete('/deletesupplier/:id', (req, res) => {
    const sqlText = `DELETE FROM "suppliers" WHERE (id=$1)`
    const sqlParams = [req.params.id]

    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500)
            console.log(`Error deleting supplier:`, error);
        })
})

module.exports = router