const suppliers = (state=[], action) => {
    if (action.type === "SET_SUPPLIERS") {
        return action.payload;
    }
    return state
}

export default suppliers;