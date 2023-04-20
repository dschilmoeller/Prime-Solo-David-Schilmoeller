import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* deleteItemFromAllItemsAgain(action) {
    try {
        console.log(`payload:`, action.payload);
        yield axios.delete(`/api/items/deleteitemfromallitems/${action.payload}`);
        
        // yield put({ type: 'SET_STOCK_ITEM_DETAILS', payload: setID })
    } catch (err) {
        console.log("error deleting item from master list", err);
    }
    
}

function* deleteItemFromAllItems() {
    // delete item from master list
    yield takeEvery("DELETE_ITEM_FROM_ALL_ITEMS", deleteItemFromAllItemsAgain);
}

export default deleteItemFromAllItems;
