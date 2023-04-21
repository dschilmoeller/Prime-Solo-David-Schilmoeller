
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import EditSupplier from "../EditSupplier/EditSupplier";
import DeleteSupplier from "../DeleteSupplier/DeleteSupplier";

import './SupplierDetail.css'

function SupplierDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const supDet = useSelector(store => store.supplierdetail);
    const itemsbysupplier = useSelector(store => store.itemsbysupplier)
    const stockItems = useSelector((store => store.myStock))
    const { id } = useParams()
    const user = useSelector(store => store.user.id)

    const headBack = () => {
        history.push('/suppliers/0')
    }

    useEffect(() => {
        dispatch({ type: "GET_SUPPLIER_DETAILS", payload: id });
        console.log(`supplier details:`, supDet );
        dispatch({ type: "FETCH_ITEMS_BY_SUPPLIER", payload: id })
    }, []);


    const clickDeleteSupplier = () => {
        console.log(`In clickdeletesupplier`);
    }

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

    // something hinky needs to be done with sql to only get MOT where userID is right
    const clickItemDetail = (id, stockItems) => {
        let inStock = false
        for (let item of stockItems) {
            if (item.object_id === id) {
                history.push(`/stockItemDetail/${item.mot_id}`)
                inStock = true
                break;
            }
        }
        if (inStock === false) {
            history.push(`/itemDetail/${id}`)
        }
    }

    return (
        <>
            <div>
                {user === 1 ? <Button onClick={clickDeleteSupplier}>Delete Supplier</Button> : null}
                
                {supDet &&
                    supDet.map((supplier) => {
                        let mailAddressSales = `mailto:${supplier.supplier_email}`;
                        let mailAddressPrimary = `mailto:${supplier.primary_contact_email}`
                        return (
                            
                            <div key={supplier.id}>
                                < EditSupplier />
                                < DeleteSupplier />

                                <h1>{supplier.supplier_name}</h1>
                                <h2>{supplier.supplier_address}</h2>
                                <div><a href={supplier.supplier_url}>{supplier.supplier_url}</a></div>
                                <br />
                                <a href={mailAddressSales}>{supplier.supplier_email}</a>
                                <div>{formatPhoneNumber(supplier.supplier_phone)}</div>
                                <br />
                                <h3>Primary Contact</h3>
                                <div>{supplier.primary_contact_name}</div>
                                <a href={mailAddressPrimary}>{supplier.primary_contact_email}</a>
                                <div>{formatPhoneNumber(supplier.primary_contact_phone)}</div>
                                <br /> <br />
                                <Button onClick={headBack}>Back</Button>
                            </div>
                        )
                    })
                }
            </div>

            <br /><br />
            <div>Items Carried:</div>
            <ul>
                {itemsbysupplier &&
                    itemsbysupplier.map((item) => {
                        const id = item.id
                        return (
                            <div key={id} id={id}
                                onClick={() => clickItemDetail(id, stockItems)}
                                className="supplierItem"
                            >
                                <li>{item.part_name} / Part #: {item.part_number}</li>
                            </div>
                        )
                    })}
            </ul>
        </>
    )
}

export default SupplierDetail