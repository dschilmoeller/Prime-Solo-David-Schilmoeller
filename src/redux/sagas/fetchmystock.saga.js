import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchmystockagain() {
  try {
    // console.log(`Fetching My Stock. Manually`);
    const myStock = yield axios.get("/api/items/fetchmystock");
    // console.log('incoming items:', allItems.data);

    yield put({
      type: "SET_MY_STOCK",
      payload: myStock.data,
    });
  } catch (err) {
    console.log("error getting stock", err);
  }
}

function* fetchMyStock() {
    // fetch all stocked items
  yield takeEvery("FETCH_MY_STOCK", fetchmystockagain);
}

export default fetchMyStock;
