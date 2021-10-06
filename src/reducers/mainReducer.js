export const mainInitialState = { auth: true };

export const mainReducer = (state, action) => {
  let updatedState = state;
  switch (action.type) {
    case "login":
      updatedState.auth = true;
      return updatedState;
    case "logout":
      updatedState.auth = false;
      return updatedState;
    default:
      return state;
  }
};

export default mainReducer;
