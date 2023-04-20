import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* deleteItemFromStockAgain(action) {
    try {
        console.log(`payload:`, action.payload);
        yield axios.delete(`/api/items/deletefrommystock/${action.payload}`);
        
        // yield put({ type: 'SET_STOCK_ITEM_DETAILS', payload: setID })
    } catch (err) {
        console.log("error deleting item from my stock", err);
    }
    
}

function* deleteItemFromStock() {
    // fetch all suppliers
    yield takeEvery("DELETE_MY_STOCK_ITEM", deleteItemFromStockAgain);
}

export default deleteItemFromStock;
