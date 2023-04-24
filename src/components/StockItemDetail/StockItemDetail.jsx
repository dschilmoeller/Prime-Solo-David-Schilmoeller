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

import EditStockItem from "../EditStockItem/EditStockItem";
import DeleteItemFromStock from "../DeleteItemFromStock/DeleteItemFromStock";
import DeleteItemFromAllItems from "../DeleteFromAllItems/DeleteFromAllItems";

function StockItemDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()
    let returnedQuant = 0

    const user = useSelector(store => store.user.id)
    const stockDetail = useSelector(store => store.stockItemDetails[0])

    const [stockoverride, setStockOverride] = useState(false)
    // console.log(`stockDetail:`, stockDetail);
    
    // 
    

    useEffect(() => {
        dispatch({ type: "GET_STOCK_ITEM_DETAILS", payload: id });
        onHandQuant()
    }, []);

    const backToMyStock = () => {
        history.push('/mystock');
    }

    const backToAll = () => {
        history.push('/allitems')
    }

    // testing - MUI modal.
    
        
    // dispatch({ type: "UPDATE_ITEM_DETAILS", payload: updatedItemDetails})
        // dispatch PUT / SAGA
        // dispatch get_stock_item_details w/ same ID.
        // shedload of local states to handle input fields.
    

    const onHandQuant = () => {
        // let returnedQuant = 0
        // wait for stockDetail to load
        // dispatch updated total to stockDetail.quantity_to_order
        // then run GET_STOCK_ITEM_DETAILS?
        if (stockDetail) {
            // returnedQuant = stockDetail.quantity_in_field * stockDetail.mttf_months
        }
    }

    // console.log(`stockItemDetail:`, stockDetail);

    if (stockDetail) {
        let supplierID = `/#/suppliers/${stockDetail.supplier_id}`
        
        return (
            <>
            <div>
            {<EditStockItem />}{<DeleteItemFromStock />}
            <div>
            {user === 1 ? <DeleteItemFromAllItems /> : null}
            </div>
                <h1>{stockDetail.part_name}</h1>
                <h2>Part Number: {stockDetail.part_number}</h2>
                <div>{stockDetail.description}</div>
                <div>Estimated Lead Time: {stockDetail.lead_time_weeks} weeks</div>
                <div>Estimated Mean Time To Failure: {stockDetail.mttf_months} months</div>
                <div>Quantity in Field: {stockDetail.quantity_in_field}</div>
                <div>Quantity on Hand: {stockDetail.quantity_owned}</div>
                <div>Recommended Quantity on Hand: {returnedQuant}</div>
                {stockDetail.stock_override ? <div>Stock Override Active</div> : null}
                {stockDetail.stock_override ? <div>Stock Override Quantity: {stockDetail.stock_override_qty}</div> : null}
                <div>Supplier: <a href={supplierID}>{stockDetail.supplier_name}</a></div>
                <br />
                <Button variant="outlined" onClick={backToMyStock}>Back to My Stock</Button><Button variant="outlined" onClick={backToAll}>Back to All Items</Button>
            </div>
            </>
        )
    } else {
        return (
            <div>
                <h1>Bad Words.</h1>
            </div>
        )
    }
}

export default StockItemDetail