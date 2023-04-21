import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* deleteSupplierAgain(action) {
    console.log(`Action.payload:`, action.payload);
    try {
        yield axios.delete(`/api/items/deletesupplier/${action.payload}`);
    } catch (err) {
        console.log("error deleting item from my stock", err);
    }
    
}

function* deleteSupplier() {
    // fetch all suppliers
    yield takeEvery("DELETE_SUPPLIER", deleteSupplierAgain);
}

export default deleteSupplier;
