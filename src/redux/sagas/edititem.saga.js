import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* editItemAgain(action) {
    
    let urlID = action.payload.itemID
    try {
        
        yield axios.put(`/api/items/allitems/${urlID}`, action.payload);
        
        yield put({ type: 'GET_ITEM_DETAIL', payload: urlID })

    } catch (err) {
        console.log("error changing inventory item", err);
    }
    
}

function* editItem() {
    // fetch all suppliers
    yield takeEvery("UPDATE_INV_ITEM_DETAILS", editItemAgain);
}

export default editItem;
