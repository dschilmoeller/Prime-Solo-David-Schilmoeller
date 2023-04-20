import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

function SupplierDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    // const supplierDetail = useSelector(store => store.supplierDetail[0])
    const { id } = useParams()

    const headBack = () => {
        history.push('/suppliers/0')
    }
    useEffect(() => {
        dispatch({ type: "GET_SUPPLIER_DETAILS", payload: id });
    }, []);

    return (
        <div>
            <h1>Supplier Detail</h1>
            <button onClick={headBack}>Back</button>
        </div>
    )
}

export default SupplierDetail