export const saveReduxStateToLocalStorage = (state) => {
  localStorage.setItem("store", JSON.stringify(state));
};

export const getReduxStateFromLocalStorage = () => {
  const state = localStorage.getItem("store");
  return state ? JSON.parse(state) : {};
};
