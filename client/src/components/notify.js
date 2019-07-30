import React from "react";
import notify from "notify-space";
import { useNotify } from "../selectors/selectors";
import { useResetNotify } from "../actions/action-hooks";

function Notify() {
  const message = useNotify();
  const reset = useResetNotify();

  React.useEffect(() => {
    if (message) {
      notify(message);
      reset();
    }
  }, [message]);

  return null;
}

export default Notify;
