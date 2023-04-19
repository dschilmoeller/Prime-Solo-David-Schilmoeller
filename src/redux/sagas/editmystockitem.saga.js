import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* editMyStockItemAgain(action) {
    console.log(`Sending to server:`, action.payload);
    let setID = action.payload.mot_id
    try {
        yield axios.put(`/api/items/mystock/${action.payload.mot_id}`, action.payload);
        
        yield put({ type: 'SET_STOCK_ITEM_DETAILS', payload: setID })
    } catch (err) {
        console.log("error changing my stock item", err);
    }
    
}

function* editMyStockItem() {
    // fetch all suppliers
    yield takeEvery("UPDATE_MY_STOCK_ITEM", editMyStockItemAgain);
}

export default editMyStockItem;
