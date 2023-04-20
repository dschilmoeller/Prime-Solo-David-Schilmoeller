import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios'

function* fetchItemDetailsAgain(action) {
    try {
        console.log(`action.payload:`, action.payload);
        const details = yield axios.get(`/api/items/fetchdetail/${action.payload}`)
        
        yield put({ type: 'SET_ITEM_DETAILS', payload: details.data })
    } catch (error) {
        console.log(`Error fetching Item Details:`, error);
    }
}

function* fetchItemDetails() {
    yield takeEvery("GET_ITEM_DETAIL", fetchItemDetailsAgain)
}

export default fetchItemDetails