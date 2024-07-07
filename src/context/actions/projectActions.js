export const SET_PROJECTS = (projects) => {
    return {
        type: "SET_PROJECTS",
        projects, // Change this line to match the payload property in the reducer
    };
};

export const SET_PROJECTS_NULL = () => {
    return {
        type: "SET_PROJECTS_NULL",
    };
};
