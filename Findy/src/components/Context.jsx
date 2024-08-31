import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  posts: [],
  likes: {},
  comments: {},
};
function appReducer(state, action) {
  let updatedState;

  switch (action.type) {
    case "TOGGLE_LIKE": {
      const { postId, userId } = action.payload;
      updatedState = {
        ...state,
        likes: {
          ...state.likes,
          [postId]: state.likes[postId]?.includes(userId)
            ? state.likes[postId].filter((id) => id !== userId)
            : [...(state.likes[postId] || []), userId],
        },
      };
      break;
    }
    case "ADD_COMMENT": {
      const { postId, comment } = action.payload;
      updatedState = {
        ...state,
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), comment],
        },
      };
      break;
    }
    case "ADD_POST": {
      updatedState = { ...state, posts: [...state.posts, action.payload] };
      break;
    }
    default:
      updatedState = state;
  }

  // Sincronizar con localStorage
  localStorage.setItem("appState", JSON.stringify(updatedState));

  return updatedState;
}

export function AppProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("appState")) || {
    posts: [],
    likes: {},
    comments: {},
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return useContext(AppContext);
}
