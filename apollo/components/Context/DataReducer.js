import Movies from "../../pages/movies";

export default function dataReducer(state, action) {
  switch (action.type) {
    case "setSelectedRow": {
      return { ...state, selectedRow: action.data.selectedID };
    }
    case "setOpened": {
      return { ...state, posterOpened: action.data.status };
    }
    case "addMovies": {
      let newState = { ...state };
      for (let i = 0; i < action.data.length; i++) {
        if (!state.movies[action.data[i].id]) {
          newState.movies[action.data[i].id] = {
            ...action.data[i],
          };
        }
      }
      return { ...newState };
    }
    case "updateMovie": {
      let newState = { ...state };
      if (action.data.Images !== undefined) {
        newState.movies[action.data.id].Images = action.data.Images;
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
}
