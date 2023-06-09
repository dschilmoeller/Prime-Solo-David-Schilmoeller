import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allItems from './allItems.reducer';
import myStock from './myStock.reducer';
import suppliers from './suppliers.reducer';
import profile from './profile.reducer';
import itemDetail from './itemdetail.reducer';
import stockItemDetails from './stockitemdetails.reducer';
import itemTypes from './itemtypes.reducer';
import supplierdetail from './supplierdetail.reducer';
import itemsbysupplier from './itemsbysupplier.reducer';
import allusers from './allusers.reducer';
import usertypes from './usertypes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allItems, // contains complete list of items.
  myStock, // contains list of items relevant to user
  suppliers, // holds list of suppliers
  profile, // holds user profile data
  itemDetail, // holds item detail data [from allItems list]
  stockItemDetails, // holds item detail data [from myStock list]
  itemTypes, // holds different item type options eg. camera, sound
  supplierdetail, // holds details of a given supplier
  itemsbysupplier, // holds items pulled sorted by supplier
  allusers, // holds list of all users and types.
  usertypes, // holds list of user types
  
});

export default rootReducer;
