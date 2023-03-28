import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");
// export const addToFavs = createAction("ADD_TO_FAVORITES");
// export const removeFromFavs = createAction("REMOVE_FROM_FAVORITES");

const initialState = {
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  celnumber: null,
  isAdmin: false,
  favorites: [],
};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});
