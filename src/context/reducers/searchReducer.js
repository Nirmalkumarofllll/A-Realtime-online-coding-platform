const searchReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return action.searchTerm; // Return the searchTerm directly
        case "SET_SEARCH_TERM_EMPTY":
            return ""; // Return an empty string for SET_SEARCH_TERM_EMPTY
        default:
            return state;
    }
};

export default searchReducer;
