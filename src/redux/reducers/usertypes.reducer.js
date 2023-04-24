const usertypes = (state=[], action) => {
    if (action.type === "SET_USER_TYPES") {
        return action.payload;
    }
    return state
}

export default usertypes;