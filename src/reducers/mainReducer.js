export const mainInitialState = { auth: false };

export const mainReducer = (state, action) => {
  let updatedState = { ...state };
  switch (action.type) {
    case "LOGIN":
      updatedState.auth = true;
      break;
    case "LOGOUT":
      updatedState.auth = false;
      localStorage.removeItem("token");
      break;
    case "CHECK_AUTH":
      const token = localStorage.getItem("token");
      if (token === "true") {
        updatedState.auth = true;
      }
      break;
    default:
      return state;
  }
  return updatedState;
};

export default mainReducer;
