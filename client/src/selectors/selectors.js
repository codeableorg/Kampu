import { useSelector, shallowEqual } from "react-redux";

function useClubs() {
  return useSelector(state => state.clubs, shallowEqual);
}

function useClubsFavorites() {
  return useSelector(state => state.favoriteClubs, shallowEqual);
}

function useSportFields() {
  return useSelector(state => state.sportFields, shallowEqual);
}

export { useClubs, useSportFields, useClubsFavorites };
