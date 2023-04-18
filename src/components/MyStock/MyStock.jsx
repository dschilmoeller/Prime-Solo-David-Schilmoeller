import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from '@mui/material';
import './MyStock.css'

function MyStock(props) {
    const myStock = useSelector((store) => store.myStock);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_MY_STOCK" })
    }, []);

    const clickItemDetail = (id) => {
        dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: id })
        history.push(`/stockItemDetail/${id}`)
    }

    return (
        <div>
            <h2>DS</h2>
            {/* TO DO */}
            <button>Toggle List View</button>
            <button>See All Items</button>

            {/* TO DO */}
            <div>
                <input></input><button>Search</button>
            </div>

            {/* Set up to click on a card and go to item details page. */}
            <div className='stockContainer'>
                {myStock.length &&
                    myStock.map((stockItem) => {
                        return (
                            <div className='itemCard' key={stockItem.mot_id}>
                                <Card sx={{ minWidth: 400 }} id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                                    <h3>item name: {stockItem.part_name}</h3>
                                    <h3>part# {stockItem.part_number}</h3>
                                    {stockItem.lead_time_weeks > 4 ? <h4>item lead time: {stockItem.lead_time_weeks / 4} months</h4> : <h4>item lead time: {stockItem.lead_time_weeks} weeks</h4>}
                                    {stockItem.mttf_months > 11 ? <h4>mean time to failure: {stockItem.mttf_months / 12} years</h4> : <h4>mean time to failure: {stockItem.mttf_months} months</h4>}
                                    <h4>Object type: {stockItem.object_type}</h4>
                                </Card>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default MyStock;
