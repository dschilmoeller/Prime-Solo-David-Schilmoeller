const stockItemDetails = (state=[], action) => {
    if (action.type === "SET_STOCK_ITEM_DETAILS") {
        return action.payload;
    }
    return state
}

export default stockItemDetails;