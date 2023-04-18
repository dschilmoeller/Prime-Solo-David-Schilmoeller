import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios'

function* fetchStockItemDetailsAgain(action) {
    try {
        // console.log(`action.payload:`, action.payload);
        const details = yield axios.get(`/api/items/mystock/${action.payload}`)
        
        yield put({ type: 'SET_STOCK_ITEM_DETAILS', payload: details.data })
    } catch (error) {
        console.log(`Error fetching Item Details:`, error);
    }
}

function* fetchStockItemDetails() {
    yield takeEvery("GET_STOCK_ITEM_DETAILS", fetchStockItemDetailsAgain)
}

export default fetchStockItemDetails