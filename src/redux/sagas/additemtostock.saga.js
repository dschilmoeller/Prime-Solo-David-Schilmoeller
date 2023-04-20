import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addItemToStockAgain(action) {
    try {
        console.log(`payload:`, action.payload);
        yield axios.post(`/api/items/addtostock/`, action.payload);
        
        // yield put({ type: 'SET_STOCK_ITEM_DETAILS', payload: setID })
    } catch (err) {
        console.log("error changing my stock item", err);
    }
    
}

function* addItemToStock() {
    // fetch all suppliers
    yield takeEvery("ADD_ITEM_TO_STOCK", addItemToStockAgain);
}

export default addItemToStock;
