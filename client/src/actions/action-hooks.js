import React from "react";
import { useDispatch } from "react-redux";
import {
  setClubs,
  setClubsFavorites,
  setSportFields,
  setFavorite,
  setUnfavorite,
  setCart,
  setUser,
  setSelectedClub,
  logout,
  setNotify,
  resetNotify
} from "./actions";

export function useSetClubs() {
  const dispatch = useDispatch();
  return React.useCallback(clubs => dispatch(setClubs(clubs)), [dispatch]);
}

export function useSetClubsFavorites() {
  const dispatch = useDispatch();
  return React.useCallback(clubs => dispatch(setClubsFavorites(clubs)), [
    dispatch
  ]);
}

export function useSetFavorite() {
  const dispatch = useDispatch();
  return React.useCallback(club => dispatch(setFavorite(club)), [dispatch]);
}

export function useSetUnfavorite() {
  const dispatch = useDispatch();
  return React.useCallback(club => dispatch(setUnfavorite(club)), [dispatch]);
}

export function useSetCart() {
  const dispatch = useDispatch();
  return React.useCallback(cart => dispatch(setCart(cart)), [dispatch]);
}

export function useSetSportFields() {
  const dispatch = useDispatch();
  return React.useCallback(
    sportFields => dispatch(setSportFields(sportFields)),
    [dispatch]
  );
}

export function useSetUser() {
  const dispatch = useDispatch();
  return React.useCallback(user => dispatch(setUser(user)), [dispatch]);
}

export function useSetSelectedClub() {
  const dispatch = useDispatch();
  return React.useCallback(id => dispatch(setSelectedClub(id)), [dispatch]);
}

export function useLogout() {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch(logout()), [dispatch]);
}

export function useSetNotify() {
  const dispatch = useDispatch();
  return React.useCallback(message => dispatch(setNotify(message)), [dispatch]);
}

export function useResetNotify() {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch(resetNotify()), [dispatch]);
}
