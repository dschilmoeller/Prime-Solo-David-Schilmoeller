
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

function SupplierDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const supDet = useSelector(store => store.supplierdetail[0])
    const { id } = useParams()

    const headBack = () => {
        history.push('/suppliers/0')
    }

    useEffect(() => {
        dispatch({ type: "GET_SUPPLIER_DETAILS", payload: id });
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

    let mailAddressSales = `mailto:${supDet.supplier_email}`;
    let mailAddressPrimary = `mailto:${supDet.primary_contact_email}`

    console.log(`supplier details:`, supDet);
    return (

        <div>
            <h1>{supDet.supplier_name}</h1>
            <h2>{supDet.supplier_address}</h2>
            <div><a href={supDet.supplier_url}>{supDet.supplier_url}</a></div>
            <br />
            <a href={mailAddressSales}>{supDet.supplier_email}</a>
            <div>{formatPhoneNumber(supDet.supplier_phone)}</div>
            <br />
            <h3>Primary Contact</h3>
            <div>{supDet.primary_contact_name}</div>
            <a href={mailAddressPrimary}>{supDet.primary_contact_email}</a>
            <div>{formatPhoneNumber(supDet.primary_contact_phone)}</div>
            <br /> <br />
            <button onClick={headBack}>Back</button>
        </div>
    )
}

export default SupplierDetail