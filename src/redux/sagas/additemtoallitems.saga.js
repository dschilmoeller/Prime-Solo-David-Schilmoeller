import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addItemToAllItemsAgain(action) {
    try {
        yield axios.post(`/api/items/additemtomasterlist/`, action.payload);
    } catch (err) {
        console.log("error adding item to master list", err);
    }
}

function* addItemToAllItems() {
    // fetch all suppliers
    yield takeEvery("ADD_ITEM_TO_ALL_ITEMS", addItemToAllItemsAgain);
}

export default addItemToAllItems;
