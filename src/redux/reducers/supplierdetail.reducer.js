const supplierdetail = (state=[], action) => {
    if (action.type === "SET_SUPPLIER_DETAILS") {
        return action.payload;
    }
    return state
}

export default supplierdetail;