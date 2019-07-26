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

function useUser() {
  return useSelector(state => state.user, shallowEqual);
}

function useSelectedClub() {
  return useSelector(state => state.selectedClub, shallowEqual);
}

export {
  useClubs,
  useSportFields,
  useClubsFavorites,
  useUser,
  useSelectedClub
};
