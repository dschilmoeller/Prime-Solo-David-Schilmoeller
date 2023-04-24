import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchUserTypesAgain() {
  try {
    const userTypes = yield axios.get("/api/items/fetchusertypes");
    yield put({
      type: "SET_USER_TYPES",
      payload: userTypes.data,
    });
  } catch (err) {
    console.log("error fetching user types", err);
  }
}

function* fetchUserTypes() {
    // fetch all user types
  yield takeEvery("FETCH_USER_TYPES", fetchUserTypesAgain);
}

export default fetchUserTypes;
