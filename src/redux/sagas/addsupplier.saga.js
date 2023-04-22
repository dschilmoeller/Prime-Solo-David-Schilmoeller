import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addSupplierAgain(action) {
    try {
        yield axios.post(`/api/items/addsupplier`, action.payload);
    } catch (err) {
        console.log("error adding item to master list", err);
    }
}

function* addSupplier() {
    yield takeEvery("ADD_SUPPLIER", addSupplierAgain);
}

export default addSupplier;
