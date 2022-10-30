import React, { useEffect } from "react";

function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    JSON.parse(sessionStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistedState;
