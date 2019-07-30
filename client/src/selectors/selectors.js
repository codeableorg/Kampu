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

function useCart() {
  return useSelector(state => state.cart, shallowEqual);
}

function useUser() {
  return useSelector(state => state.user, shallowEqual);
}

function useSelectedClub() {
  return useSelector(state => state.selectedClub, shallowEqual);
}

function useNotify() {
  return useSelector(state => state.notify, shallowEqual);
}

export {
  useClubs,
  useSportFields,
  useClubsFavorites,
  useUser,
  useSelectedClub,
  useCart,
  useNotify
};
