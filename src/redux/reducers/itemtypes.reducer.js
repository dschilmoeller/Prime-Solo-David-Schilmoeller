const itemTypes = (state=[], action) => {
    if (action.type === "SET_ITEM_TYPES") {
        return action.payload;
    }
    return state
}

export default itemTypes;