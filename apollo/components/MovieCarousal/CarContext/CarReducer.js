export default function carousalReducer(state, action) {
  switch (action.type) {
    case "setSelIndex": {
      let { selIndex, cardOpened } = action.data;
      let newOffset = selIndex * 200 - window.innerWidth / 2 - 200;
      if (!cardOpened) {
        newOffset = selIndex * 200 - window.innerWidth / 2 - 620;
      }
      //this needs to dispatch only when we are changing a selected row.
      if (
        action.data.dispatch &&
        action.data.selectedRow !== state.carousalID
      ) {
        action.data.dispatch({
          type: "setSelectedRow",
          data: { selectedID: state.carousalID },
        });
      }
      return {
        ...state,
        selIndex: selIndex,
        carOffset: newOffset,
        cardOpened: cardOpened,
      };
    }
    case "openStatus": {
      return { ...state, cardOpened: action.data.cardOpened };
    }
    default:
      return { ...state };
  }
}
