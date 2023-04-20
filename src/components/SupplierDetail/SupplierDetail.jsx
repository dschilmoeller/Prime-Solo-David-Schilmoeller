
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

function SupplierDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const supDet = useSelector(store => store.supplierdetail);
    const itemsbysupplier = useSelector(store => store.itemsbysupplier)
    const { id } = useParams()

    const headBack = () => {
        history.push('/suppliers/0')
    }

    useEffect(() => {
        dispatch({ type: "GET_SUPPLIER_DETAILS", payload: id });
        dispatch({ type: "FETCH_ITEMS_BY_SUPPLIER", payload: id })
    }, []);

    console.log(`items by from this supplier:`, itemsbysupplier);
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
        <>
            <div>
                <div>Supplier Details</div>
                {supDet &&
                    supDet.map((supplier) => {
                        let mailAddressSales = `mailto:${supplier.supplier_email}`;
                        let mailAddressPrimary = `mailto:${supplier.primary_contact_email}`

                        return (
                            <div key={supplier.id}>
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
                                <button onClick={headBack}>Back</button>
                            </div>
                        )
                    })
                }
            </div>

            <div>Items Carried:</div>
            <ul>
                {itemsbysupplier &&
                    itemsbysupplier.map((item) => {
                        return (
                            <li>{item.part_name}</li>
                        )
                    })}
            </ul>
        </>
    )
}

export default SupplierDetail