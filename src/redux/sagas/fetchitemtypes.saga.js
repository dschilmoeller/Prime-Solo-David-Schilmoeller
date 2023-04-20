import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchItemTypesAgain() {
  try {
    // console.log(`Fetching item types`);
    const itemTypes = yield axios.get("/api/items/get/fetchitemtypes");
    yield put({
      type: "SET_ITEM_TYPES",
      payload: itemTypes.data,
    });
  } catch (err) {
    console.log("error getting item types", err);
  }
}

function* fetchItemTypes() {
    // fetch all item types
  yield takeEvery("FETCH_ITEM_TYPES", fetchItemTypesAgain);
}

export default fetchItemTypes;
