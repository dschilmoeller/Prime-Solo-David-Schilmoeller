import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* editSupplierDetailsAgain(action) {    
    try {
        yield axios.put(`/api/items/setsupplierdetails/${action.payload.updateSupplierID}`, action.payload);
        
        yield put({ type: 'GET_SUPPLIER_DETAILS', payload: action.payload.updateSupplierID})
    } catch (err) {
        console.log("error changing my stock item", err);
    }
    
}

function* editSupplierDetails() {
    // fetch all suppliers
    yield takeEvery("UPDATE_SUPPLIER_DETAILS", editSupplierDetailsAgain);
}

export default editSupplierDetails;
