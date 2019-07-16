export function setClubs(clubs) {
  return { type: "SET_CLUBS", payload: clubs };
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
