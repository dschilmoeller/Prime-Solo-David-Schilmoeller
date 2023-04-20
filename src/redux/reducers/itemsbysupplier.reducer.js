const itemsbysupplier = (state=[], action) => {
    if (action.type === "SET_ITEMS_BY_SUPPLIER") {
        return action.payload;
    }
    return state
}

export default itemsbysupplier;