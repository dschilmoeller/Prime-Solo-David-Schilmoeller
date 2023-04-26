// two ways to do this
// 1 - single page w/ lots of conditional rendering
// upside - DRYer code
// downside - would probably have to fetch and loop through my_objects_table 
// before rendering to determine whether given user has an item at all.

// 2 - page for all items vs page for my stock items
// still would have to grab and loop through all items, 
// then redirect on match.

// either way still going through everything in my_object_table
// prior to rendering. 
// 

// also need to deal with refreshing and hitting back button, if possible. Fix
// may be the same for both.

// array.includes()!!

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import EditStockItem from "../EditStockItem/EditStockItem";
import EditAllItems from "../EditAllItems/EditAllItems";
import DeleteItemFromStock from "../DeleteItemFromStock/DeleteItemFromStock";
import DeleteItemFromAllItems from "../DeleteFromAllItems/DeleteFromAllItems";

function StockItemDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()
    let returnedQuant;

    const user = useSelector(store => store.user.user_type)
    const stockDetail = useSelector(store => store.stockItemDetails[0])
    const itemDetail = useSelector(store => store.itemDetail[0])

    useEffect(() => {
        dispatch({ type: "GET_STOCK_ITEM_DETAILS", payload: id });
    }, []);

    const backToMyStock = () => { history.push('/mystock') };
    const backToAll = () => { history.push('/allitems') }

    const onHandQuant = () => {
        returnedQuant = 0
        if (user === 1 || user === 2 || user === 3) {
            returnedQuant = Math.round((stockDetail.quantity_in_field / stockDetail.mttf_months)) * Math.floor((stockDetail.lead_time_weeks / 4))
        }
        // console.log(`returnedQuant for ${stockDetail.part_name}:`, returnedQuant);
    }

    // console.log(`stockItemDetail:`, stockDetail);

    if (stockDetail) {
        let supplierID = `/#/suppliers/${stockDetail.supplier_id}`
        onHandQuant()

        if (itemDetail) {
            return (

                <>
                    <div>
                        <div className="btn-container-no-margin">
                            {<EditStockItem />}
                            {<DeleteItemFromStock />}
                        </div>
                        <div className="stock-container">
                            <div className="header-item">{stockDetail.part_name}</div>
                            <div className="part-number">Part Number: {stockDetail.part_number}</div>
                            <div className="description">{stockDetail.description}</div>
                            <div>Estimated Lead Time: {stockDetail.lead_time_weeks} weeks</div>
                            <div>Estimated Mean Time To Failure: {stockDetail.mttf_months} months</div>
                            <div>Quantity in Field: {stockDetail.quantity_in_field}</div>
                            <div>Quantity on Hand: {stockDetail.quantity_owned}</div>
                            <div>Recommended Quantity on Hand: {returnedQuant}</div>
                            {stockDetail.stock_override ? <div>Stock Override Active</div> : null}
                            {stockDetail.stock_override ? <div>Stock Override Quantity: {stockDetail.stock_override_qty}</div> : null}
                            <div>Supplier: <a href={supplierID}>{stockDetail.supplier_name}</a></div>
                        </div>

                        <div className="btn-container-no-margin">
                        <div className="btn-container-no-margin">
                            <Button startIcon={<ArrowCircleLeftIcon />} variant="outlined" sx={{ m: 1 }} onClick={backToMyStock}>Back to My Stock</Button>
                            <Button startIcon={<ArrowCircleLeftIcon />} variant="outlined" sx={{ m: 1 }} onClick={backToAll}>Back to All Items</Button>
                            </div>
                            {user === 1 ? <EditAllItems /> : null}
                            {user === 1 ? <DeleteItemFromAllItems /> : null}
                        </div>

                    </div>

                </>
            )
        } else {
            return null
        }
    } else {
        return (
            <div>
                <h1>Bad Words.</h1>
            </div>
        )
    }
}

export default StockItemDetail