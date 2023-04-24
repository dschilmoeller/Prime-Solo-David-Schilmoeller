import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllUsersAgain() {
  try {
    // console.log(`Fetching All Items. Manually`);
    const allUsers = yield axios.get("/api/items/fetchallusers");
    // console.log('all Users:', allUsers.data);

    yield put({
      type: "SET_ALL_USERS",
      payload: allUsers.data,
    });
  } catch (err) {
    console.log("error getting Users", err);
  }
}

function* fetchAllUsers() {
    // fetch all users for admin
  yield takeEvery("FETCH_ALL_USERS", fetchAllUsersAgain);
}

export default fetchAllUsers;
