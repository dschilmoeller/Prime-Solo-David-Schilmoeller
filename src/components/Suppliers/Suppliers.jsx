// ToDo re: suppliers - 
// rework so that user.jsx dumps here with blank search string? some method of pulling up all suppliers.
// links from individual objects go straight to relevant details page.



import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AddSupplier from '../AddSupplier/AddSupplier';
import './Suppliers.css'

function Suppliers(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const suppliers = useSelector((store) => store.suppliers);

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

    const clickSupplierDetail = (id) => {
        history.push(`/supplierdetail/${id}`)
    }

    // search functionality
    const [searchParam, setSearchParam] = useState('')
    const searchables = suppliers.map(item => { return item.supplier_name })


    const filterData = (query, data) => {
        if (!query) {
            return data;
        } else {
            return data.filter((d) => d.toLowerCase().includes(query));
        }
    };

    const dataFiltered = filterData(searchParam, searchables);
    // end search functionality

    return (
        <div>
            <div className='general-container'>
            <h1>Suppliers</h1>
            <TextField
            autoFocus
                id="search-bar"
                className="text"
                onChange={(e) => {
                    setSearchParam(e.target.value);
                }}
                value={searchParam}
                label="Enter Search Term"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />

            <AddSupplier />
            </div>
            {/* Set up to click on a card and go to supplier details page. */}
            <div className='supplier-container' >
                {dataFiltered.map((d, i) => (
                    <div  key={i} >
                {suppliers.length &&
                    suppliers.map((supplier) => {
                        if (supplier.supplier_name === d) {
                        let supplierURL = supplier.supplier_url;
                        let mailAddress = `mailto:${supplier.primary_contact_email}`;
                        let supplierID = supplier.id;

                        return (
                            <div key={supplier.id}>
                                <Card className='itemCard' sx={{ minWidth: 400 }} onClick={() => clickSupplierDetail(supplier.id)}>
                                    <h3>{supplier.supplier_name}</h3>
                                    <h3>{formatPhoneNumber(supplier.supplier_phone)}</h3>
                                    <h4>{supplier.supplier_address}</h4>
                                    <h4>{supplier.supplier_email}</h4>
                                    <a href={supplierURL} target="_blank">{supplier.supplier_url}</a>
                                    <p>Primary Contact: {supplier.primary_contact_name} | {formatPhoneNumber(supplier.primary_contact_phone)} |
                                        <a id={supplierID}> </a><a href={mailAddress}>{supplier.primary_contact_email}</a></p>
                                </Card>
                            </div>
                        )}
                    })}        
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Suppliers;
