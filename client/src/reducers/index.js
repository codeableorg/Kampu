import { combineReducers } from "redux";

export const initialState = {
  appName: "Kampu",
  clubs: [],
  sportFields: [],
  favoriteClubs: [],
  cart: {},
  user: {}
};

export function clubsReducer(state = initialState.clubs, action) {
  switch (action.type) {
    case "SET_CLUBS": {
      return action.payload;
    }
    case "FAVORITED":
    case "UNFAVORITED": {
      return state.map(club => {
        if (club.id === action.payload.id) {
          return {
            ...club,
            favorited: action.payload.favorited,
            favorited_count: action.payload.favorited_count
          };
        }
        return club;
      });
    }
    default: {
      return state;
    }
  }
}

export function sportFieldsReducer(state = initialState.sportFields, action) {
  switch (action.type) {
    case "SET_SPORTFIELDS": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function favoriteClubsReducer(
  state = initialState.favoriteClubs,
  action
) {
  switch (action.type) {
    case "SET_CLUBS_FAVORITES": {
      return action.payload;
    }
    case "FAVORITED":
    case "UNFAVORITED": {
      return state.map(club => {
        if (club.id === action.payload.id) {
          return {
            ...club,
            favorited: action.payload.favorited,
            favorited_count: action.payload.favorited_count
          };
        }
        return club;
      });
    }
    default: {
      return state;
    }
  }
}

export function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case "SET_CART": {
      return action.payload;
    }
    case "RESET_CART": {
      return {};
    }
    default: {
      return state;
    }
  }
}

const reducer = combineReducers({
  clubs: clubsReducer,
  sportFields: sportFieldsReducer,
  favoriteClubs: favoriteClubsReducer,
  cart: cartReducer
});

export default reducer;
