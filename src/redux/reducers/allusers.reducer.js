const allusers = (state=[], action) => {
    if (action.type === "SET_ALL_USERS") {
        return action.payload;
    }
    return state
}

export default allusers;