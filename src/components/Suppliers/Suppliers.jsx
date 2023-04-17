import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import './Suppliers.css'

function Suppliers(props) {
    const suppliers = useSelector((store) => store.suppliers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_SUPPLIERS" })
    }, []);

    return (
        <div>
            <h2>DS</h2>
            
            {/* TO DO */}
            <div>
                <input></input><button>Search</button>
            </div>

            {/* Set up to click on a card and go to supplier details page. */}
            <div className='supplierContainer'>
                {suppliers.length &&
                    suppliers.map((supplier) => {
                        return (
                            <div className='itemCard' key={supplier.id}>
                                <Card sx={{ minWidth: 400 }} >
                                    <h3></h3>
                                    <h3></h3>
                                    <h4></h4>
                                    <h4></h4>
                                    <h4></h4>
                                </Card>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Suppliers;
