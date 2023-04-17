import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchSuppliersAgain() {
  try {
    // console.log(`Fetching My Stock. Manually`);
    const suppliers = yield axios.get("/api/items/fetchsuppliers");
    // console.log('incoming items:', allItems.data);

    yield put({
      type: "SET_SUPPLIERS",
      payload: suppliers.data,
    });
  } catch (err) {
    console.log("error getting suppliers", err);
  }
}

function* fetchSuppliers() {
    // fetch all suppliers
  yield takeEvery("FETCH_SUPPLIERS", fetchSuppliersAgain);
}

export default fetchSuppliers;
