const myStock = (state=[], action) => {
    if (action.type === "SET_MY_STOCK") {
        return action.payload;
    }
    return state
}

export default myStock;