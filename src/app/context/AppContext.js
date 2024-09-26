import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { AppReducer, initialState, persistIgnore } from "./AppReducer";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    const stateFromLocalStorage = JSON.parse(localStorage.getItem("state"));

    if (stateFromLocalStorage) { 
      const persistedStateWithIgnoredInitialProperties = {};
      
      for (const [key, value] of Object.entries(stateFromLocalStorage)) {
        if (persistIgnore.includes(key) && Object.hasOwn(initialState, key)) {
          persistedStateWithIgnoredInitialProperties[key] = initialState[key];
        } else {
          persistedStateWithIgnoredInitialProperties[key] = value;
        }
      }

      dispatch({
        type: "init_stored",
        value: persistedStateWithIgnoredInitialProperties,
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state)); 
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
