import React from "react";
import { useDispatch } from "react-redux";

import {
  setClubs,
  setSportFields,
  setFavorite,
  setUnfavorite
} from "./actions";

export function useSetClubs() {
  const dispatch = useDispatch();
  return React.useCallback(clubs => dispatch(setClubs(clubs)), [dispatch]);
}

export function useSetFavorite() {
  const dispatch = useDispatch();
  return React.useCallback(club => dispatch(setFavorite(club)), [dispatch]);
}

export function useSetUnfavorite() {
  const dispatch = useDispatch();
  return React.useCallback(club => dispatch(setUnfavorite(club)), [dispatch]);
}

export function useSetSportFields() {
  const dispatch = useDispatch();
  return React.useCallback(
    sportFields => dispatch(setSportFields(sportFields)),
    [dispatch]
  );
}
