import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* editProfileAgain(action) {
    console.log(`Sending to server:`, action.payload);
    
    try {
        yield axios.put(`/api/items/setprofiledetails/`, action.payload);
        
        yield put({ type: 'FETCH_USER'})
    } catch (err) {
        console.log("error changing my stock item", err);
    }
    
}

function* editProfile() {
    // fetch all suppliers
    yield takeEvery("UPDATE_USER_PROFILE", editProfileAgain);
}

export default editProfile;
