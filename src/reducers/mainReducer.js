export const mainInitialState = { auth: false, user: {} };

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
      updatedState.user = action.payload;
      break;
    default:
      break;
  }
  return updatedState;
};

export default mainReducer;
