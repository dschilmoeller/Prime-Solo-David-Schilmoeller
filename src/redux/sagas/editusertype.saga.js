import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* editUserTypeAgain(action) {
console.log(`edit user type action.payload:`, action.payload);
    try {
        yield axios.put(`/api/items/setusertype/`, action.payload);
        
        // yield put({ type: 'GET_SUPPLIER_DETAILS', payload: action.payload.updateSupplierID})
    } catch (err) {
        console.log("error changing my stock item", err);
    }
    
}

function* editUserType() {
    // fetch all suppliers
    yield takeEvery("EDIT_USER_TYPE", editUserTypeAgain);
}

export default editUserType;
