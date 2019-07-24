import React from "react";
import { useDispatch } from "react-redux";
import {
  setClubs,
  setClubsFavorites,
  setSportFields,
  setFavorite,
  setUnfavorite,
  setCart
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
