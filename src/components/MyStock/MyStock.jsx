import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import './MyStock.css'

function MyStock(props) {
    const myStock = useSelector((store) => store.myStock);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_MY_STOCK" })
    }, []);

    return (
        <div>
            <h2>DS</h2>
            <div className='stockContainer'>
                {myStock.length &&
                    myStock.map((stockItem) => {
                        return (
                            <div className='itemCard' key={stockItem.mot_id}>
                                <Card sx={{ minWidth: 400 }} >
                                    <h3>item name: {stockItem.part_name}</h3>
                                    <h3>part# {stockItem.part_number}</h3>
                                    {stockItem.lead_time_weeks > 4 ? <h4>item lead time: {stockItem.lead_time_weeks / 4 } months</h4> : <h4>item lead time: {stockItem.lead_time_weeks} weeks</h4> }
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
