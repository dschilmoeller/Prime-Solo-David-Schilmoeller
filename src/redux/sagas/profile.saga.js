import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchProfileAgain() {
  try {

    const profile = yield axios.get("/api/items/fetchProfile");
    console.log('incoming items:', profile.data);

    yield put({
      type: "SET_PROFILE",
      payload: profile.data,
    });
  } catch (err) {
    console.log("error getting profile data", err);
  }
}

function* fetchProfile() {
    // fetch all profile data
  yield takeEvery("FETCH_PROFILE", fetchProfileAgain);
}

export default fetchProfile;
