export const SET_USER = (user) => {
    return {
        type : "SET_USER",
        user: user,
    };
};

  export const SET_NULL_USER = () => {
    return{
        type : "SET_USER_NULL",
    };
  };