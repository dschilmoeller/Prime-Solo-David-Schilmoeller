
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import EditSupplier from "../EditSupplier/EditSupplier";
import DeleteSupplier from "../DeleteSupplier/DeleteSupplier";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

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
        console.log(`supplier details:`, supDet);
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
            <div className="general-container">
                {supDet &&
                    supDet.map((supplier) => {
                        let mailAddressSales = `mailto:${supplier.supplier_email}`;
                        let mailAddressPrimary = `mailto:${supplier.primary_contact_email}`
                        return (
                            <>
                            {user === 1 ? <></> : <></>}
                                <div key={supplier.id} >
                                    <div className="edit-supplier-box">
                                        < EditSupplier />
                                    </div>
                                    <div className="button-box">
                                        < DeleteSupplier />
                                    </div>
                                </div>
                                <div>
                                    <div class="header-item">{supplier.supplier_name}</div>
                                    <div>{supplier.supplier_address}</div>
                                    <div><a href={supplier.supplier_url} target="_blank">{supplier.supplier_url}</a></div>

                                    <a href={mailAddressSales}>{supplier.supplier_email}</a>
                                    <div>{formatPhoneNumber(supplier.supplier_phone)}</div>
                                    <br />
                                    <div class="header-item">Primary Contact</div>
                                    <div>{supplier.primary_contact_name}</div>
                                    <a href={mailAddressPrimary}>{supplier.primary_contact_email}</a>
                                    <div>{formatPhoneNumber(supplier.primary_contact_phone)}</div>
                                    <br />
                                    <div className="button-box">
                                        <Button startIcon={<ArrowCircleLeftIcon />} variant="contained" sx={{ minWidth: 200 }} onClick={headBack}>Back</Button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>

            <br/>
            <div className="supplier-detail-container">Items Carried:
            <br/>
            <ul>
                {itemsbysupplier &&
                    itemsbysupplier.map((item) => {
                        const id = item.id
                        return (
                            <div key={id} id={id}>
                                <li className="supplierItem" onClick={() => clickItemDetail(id, stockItems)}>{item.part_name} / Part #: {item.part_number}</li>
                            </div>
                        )
                    })}
            </ul>
            </div>
        </>
    )
}

export default SupplierDetail