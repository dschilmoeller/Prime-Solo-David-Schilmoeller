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
    let quantityToOrder;


    const user = useSelector(store => store.user.user_type)
    const stockDetail = useSelector(store => store.stockItemDetails[0])
    const itemDetail = useSelector(store => store.itemDetail[0])

    useEffect(() => {
        dispatch({ type: "GET_STOCK_ITEM_DETAILS", payload: id });
    }, []);

    const backToMyStock = () => { history.push('/mystock/0') };
    const backToAll = () => { history.push('/allitems') }

    const onHandQuant = () => {
        returnedQuant = 0
        if (user === 1 || user === 2 || user === 3) {
            returnedQuant = Math.round((stockDetail.quantity_in_field / stockDetail.mttf_months)) * Math.floor((stockDetail.lead_time_weeks / 4))
        }
        if (user === 4) {
            returnedQuant = Math.round((stockDetail.quantity_in_field / stockDetail.mttf_months)) * Math.floor((stockDetail.lead_time_weeks / 6))
            if (returnedQuant === 0) {
                returnedQuant = Math.round(stockDetail.quantity_in_field / 1000)
            }
        }

        if (returnedQuant > stockDetail.quantity_owned) {
            quantityToOrder = returnedQuant - stockDetail.quantity_owned
            // console.log(`Quant to order:`, quantityToOrder);
        }

        if (stockDetail.stock_override === true) {
            quantityToOrder = stockDetail.stock_override_qty - stockDetail.quantity_owned
        }
    }

    // console.log(`stockItemDetail:`, stockDetail);

    if (stockDetail) {
        let supplierID = `/#/supplierdetail/${stockDetail.supplier_id}`
        onHandQuant()
        scroll(0, 0)

        if (itemDetail) {
            return (
                <>
                    <div className="stock-container">
                        <div className="buffer-box">
                            <div className="header-item">{stockDetail.part_name}</div>
                            <div className="part-number">Part Number: <b>{stockDetail.part_number}</b></div>
                            {/* <div className="btn-container-no-margin"> */}
                            {<EditStockItem returnedQuant={returnedQuant} />}
                            {<DeleteItemFromStock />}
                            {/* </div> */}

                            {quantityToOrder > 0 ? (
                                <>

                                    <div className="one-margin"><b>Item Stocks Low</b></div>
                                    <div className="order-alert one-margin">Consider ordering {quantityToOrder} units to maintain recommended stock levels</div>

                                </>
                            ) :
                                null}

                            <img src={stockDetail.img_url} width={150} />
                            <div className="one-margin">
                                <div className="description">{stockDetail.description}</div>
                            </div>
                            <table>
                                <tr>
                                    <td><b>Part name:</b></td>
                                    <td>{stockDetail.part_name}</td>
                                </tr>
                                <tr>
                                    <td><b>Part Number:</b></td>
                                    <td>{stockDetail.part_number}</td>
                                </tr>
                                <tr>
                                    <td><b>Estimated Lead Time:</b></td>
                                    <td>{stockDetail.lead_time_weeks} weeks</td>
                                </tr>
                                <tr>
                                    <td><b>Estimated Mean Time To Failure:</b></td>
                                    <td>{stockDetail.mttf_months} months</td>
                                </tr>
                                <tr>
                                    <td><b>Quantity in Field:</b></td>
                                    <td>{stockDetail.quantity_in_field}</td>
                                </tr>
                                <tr>
                                    <td><b>Quantity on Hand:</b></td>
                                    <td>{stockDetail.quantity_owned}</td>
                                </tr>
                                <tr>
                                    <td><b>Recommended Quantity on Hand:</b></td>
                                    <td>{returnedQuant} </td>
                                </tr>

                                {stockDetail.stock_override ? (
                                    <>
                                        <tr>
                                            <td className="overridebox textbox"><b>Stock Override Active</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Stock Override Quantity:</b></td>
                                            <td>{stockDetail.stock_override_qty}</td>
                                        </tr>
                                    </>) : null}
                                <tr>
                                    <td><b>Supplier:</b></td>
                                    <td><a href={supplierID}>{stockDetail.supplier_name}</a></td>
                                </tr>
                            </table>


                            {/* <div className="btn-container-no-margin">
                            <div className="btn-container-no-margin"> */}
                            <Button startIcon={<ArrowCircleLeftIcon />} variant="contained" color="success" sx={{ m: 1, marginTop: 3, width: 300 }} onClick={backToMyStock}>Back to My Stock</Button>
                            <Button startIcon={<ArrowCircleLeftIcon />} variant="outlined" color='success' sx={{ m: 1, width: 300 }} onClick={backToAll}>Back to All Items</Button>
                            {/* </div> */}
                            {user === 1 ? <EditAllItems /> : null}
                            {user === 1 ? <DeleteItemFromAllItems /> : null}
                            {/* </div> */}
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