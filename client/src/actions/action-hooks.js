import React from "react";
import { useDispatch } from "react-redux";

import { setClubs, setSportFields } from "./actions";

export function useSetClubs() {
  const dispatch = useDispatch();
  return React.useCallback(clubs => dispatch(setClubs(clubs)), [dispatch]);
}

export function useSetSportFields() {
  const dispatch = useDispatch();
  return React.useCallback(
    sportFields => dispatch(setSportFields(sportFields)),
    [dispatch]
  );
}
