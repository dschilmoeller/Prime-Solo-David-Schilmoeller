const itemDetail = (state=[], action) => {
    if (action.type === "SET_ITEM_DETAILS") {
        return action.payload;
    }
    return state
}

export default itemDetail;