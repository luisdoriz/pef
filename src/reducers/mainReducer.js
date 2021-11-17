export const mainInitialState = { auth: false, user: {}, facilities: [] };

export const mainReducer = (state, action) => {
  let updatedState = { ...state };
  switch (action.type) {
    case "LOGIN":
      updatedState.auth = true;
      localStorage.setItem("token", "Bearer " + action.payload.token);
      break;
    case "LOGOUT":
      updatedState.auth = false;
      localStorage.removeItem("token");
      break;
    case "CHECK_AUTH":
      updatedState.auth = true;
      const { user, facilities } = action.payload;
      updatedState.user = user;
      updatedState.facilities = facilities;
      break;
    default:
      break;
  }
  return updatedState;
};

export default mainReducer;
