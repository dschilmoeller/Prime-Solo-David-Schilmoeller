import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchItemsBySupplierAgain(action) {
  try {
    const itemsBySupplier = yield axios.get(`/api/items/fetchitemsbysupplier/${action.payload}`);
    yield put({ type: "SET_ITEMS_BY_SUPPLIER", payload: itemsBySupplier.data });
  } catch (err) {
    console.log("error getting item types", err);
  }
}

function* fetchItemsBySupplier() {
    // fetch all item types
  yield takeEvery("FETCH_ITEMS_BY_SUPPLIER", fetchItemsBySupplierAgain);
}

export default fetchItemsBySupplier;
