export function setClubs(clubs) {
  return { type: "SET_CLUBS", payload: clubs };
}

export function setClubsFavorites(clubs) {
  return { type: "SET_CLUBS_FAVORITES", payload: clubs };
}

export function setFavorite(clubs) {
  return { type: "FAVORITED", payload: clubs };
}
export function setUnfavorite(clubs) {
  return { type: "UNFAVORITED", payload: clubs };
}

export function setSportFields(sportFields) {
  return { type: "SET_SPORTFIELDS", payload: sportFields };
}

export function setUser(user) {
  return { type: "SET_USER", payload: user };
}

export function logout() {
  return { type: "SET_LOGOUT" };
}

export function setSelectedClub(id) {
  return { type: "SET_SELECTED_CLUB", payload: id };
}

export function setCart(data) {
  return { type: "SET_CART", payload: data };
}
