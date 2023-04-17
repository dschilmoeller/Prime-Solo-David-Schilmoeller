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

    // courtesy of Stack Overflow:
    // https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '');
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
      }

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
                        let supplierURL = supplier.supplier_url
                        let mailAddress = `mailto:${supplier.primary_contact_email}`
                        return (
                            <div className='itemCard' key={supplier.id}>
                                <Card sx={{ minWidth: 400 }} >
                                    <h3>{supplier.supplier_name}</h3>
                                    <h3>{formatPhoneNumber(supplier.supplier_phone)}</h3>
                                    <h4>{supplier.supplier_address}</h4>
                                    <h4>{supplier.supplier_email}</h4>
                                    <a href={supplierURL} >{supplier.supplier_url}</a>
                                    <p>Primary Contact: {supplier.primary_contact_name} | {formatPhoneNumber(supplier.primary_contact_phone)} |
                                    <a> </a><a href={mailAddress}>{supplier.primary_contact_email}</a></p>
                                </Card>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Suppliers;