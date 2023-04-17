import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllAgain() {
  try {
    // console.log(`Fetching All Items. Manually`);
    const allItems = yield axios.get("/api/items/fetchallitems");
    // console.log('incoming items:', allItems.data);

    yield put({
      type: "SET_ALL_ITEMS",
      payload: allItems.data,
    });
  } catch (err) {
    console.log("error getting items", err);
  }
}

function* fetchAll() {
    // fetch all shelf items
  yield takeEvery("FETCH_ALL_ITEMS", fetchAllAgain);
}

export default fetchAll;
