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
import fetchSupplierDetail from './fetchsupplierdetail.saga';
import fetchItemsBySupplier from './fetchitemsbysupplier.saga';
import editMyStockItem from './editmystockitem.saga';
import editItem from './edititem.saga';
import addItemToStock from './additemtostock.saga';
import fetchItemTypes from './fetchitemtypes.saga';
import addItemToAllItems from './additemtoallitems.saga';
import deleteItemFromStock from './deletestockitem.saga';
import deleteItemFromAllItems from './deleteitemfromallitems.saga';
import editSupplierDetails from './editsupplierdetails.saga';
import deleteSupplier from './deletesupplier.saga';
import addSupplier from './addsupplier.saga';
import editProfile from './editprofile.saga';
import fetchAllUsers from './fetchAllUsers.saga';

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
    fetchSupplierDetail(),
    editMyStockItem(),
    editItem(),
    addItemToStock(),
    fetchItemTypes(),
    addItemToAllItems(),
    deleteItemFromStock(),
    deleteItemFromAllItems(),
    fetchItemsBySupplier(),
    editSupplierDetails(),
    deleteSupplier(),
    addSupplier(),
    editProfile(),
    fetchAllUsers(),
    

  ]);
}
