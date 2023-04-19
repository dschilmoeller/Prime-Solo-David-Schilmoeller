import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import fetchAll from './fetchall.saga'
import fetchmystock from './fetchmystock.saga'
import fetchSuppliers from './fetchsuppliers.saga';
import fetchProfile from './profile.saga';
import fetchItemDetails from './fetchitemdetail.saga';
import fetchStockItemDetails from './fetchstockitemdetail.saga';
import editMyStockItem from './editmystockitem.saga';
import editItem from './edititem.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    fetchAll(),
    fetchmystock(),
    fetchSuppliers(),
    fetchProfile(),
    fetchItemDetails(),
    fetchStockItemDetails(),
    editMyStockItem(),
    editItem(),
    
    
  ]);
}
