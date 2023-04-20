import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios'

function* fetchSupplierDetailAgain(action) {
    try {
        // console.log(`action.payload:`, action.payload);
        const details = yield axios.get(`/api/items/supplierdetails/${action.payload}`)
        yield put({ type: 'SET_SUPPLIER_DETAILS', payload: details.data })
    } catch (error) {
        console.log(`Error fetching Supplier Details:`, error);
    }
}

function* fetchSupplierDetail() {
    yield takeEvery("GET_SUPPLIER_DETAILS", fetchSupplierDetailAgain)
}

export default fetchSupplierDetail