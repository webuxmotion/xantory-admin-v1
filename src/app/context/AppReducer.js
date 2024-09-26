export const initialState = {
  number: 4,
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }

    case "add_number": {
      return {
        ...state,
        number: action.value + state.number,
      };
    }

    case "set_is_dark_mode": {
      return {
        ...state,
        isDarkMode: action.value,
      };
    }

    case "set_is_sidebar_collapsed": {
      return {
        ...state,
        isSidebarCollapsed: action.value,
      };
    }
  }
};
