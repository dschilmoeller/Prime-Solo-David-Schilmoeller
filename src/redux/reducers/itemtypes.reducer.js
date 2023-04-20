const itemTypes = (state=[], action) => {
    if (action.type === "SET_ITEM_TYPES") {
        console.log(`In set item types`);
        return action.payload;
    }
    return state
}

export default itemTypes;