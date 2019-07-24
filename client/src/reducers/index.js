import { combineReducers } from "redux";

export const initialState = {
  appName: "Kampu",
  clubs: [],
  selectedClub: null,
  sportFields: [],
  favoriteClubs: [],
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

export function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case "SET_USER": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function selectedClubReducer(state = initialState.selectedClub, action) {
  switch (action.type) {
    case "SET_SELECTED_CLUB": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const reducer = combineReducers({
  clubs: clubsReducer,
  selectedClub: selectedClubReducer,
  sportFields: sportFieldsReducer,
  favoriteClubs: favoriteClubsReducer,
  user: userReducer
});

export default reducer;
