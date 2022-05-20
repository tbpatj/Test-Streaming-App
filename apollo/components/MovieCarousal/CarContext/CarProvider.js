import { createContext, useReducer, useContext, useEffect } from "react";
import { DataContext } from "../../Context/GlobalData";
import carousalReducer from "./CarReducer";

export const CarousalContext = createContext();

export const CarousalProvider = ({ children, carousalID, movies }) => {
  const { selectedRow, dispatch: dataDispatch } = useContext(DataContext);
  useEffect(() => {
    dataDispatch({
      type: "addMovies",
      data: movies,
    });
  }, [movies]);
  let ids = movies.map((el) => el.id);
  let random = Math.floor(Math.random() * ids.length);
  //instantiate the basic dispatcher and data, using a reducer I created
  const [data, dispatch] = useReducer(carousalReducer, {
    carousalID: carousalID,
    movIds: ids,
    selIndex: random,
    cardOpened: false,
    carOffset: random * 200 - window.innerWidth / 2 - 200,
  });

  //if the row selected isn't the current carousal then deselect the main part
  useEffect(() => {
    if (carousalID !== selectedRow) {
      dispatch({
        type: "openStatus",
        data: { cardOpened: false },
      });
    }
  }, [selectedRow]);

  //this is the actual provider of the data this allows us to access the data quickly and
  // export what data from the context we actually want and need, so we don't need to export all the data cause something are context background
  const provider = {
    carousalID: data.carousalID,
    movIds: data.movIds,
    selIndex: data.selIndex,
    cardOpened: data.cardOpened,
    carOffset: data.carOffset,
    carDispatch: dispatch,
  };

  //return the context with our data and reducer
  return (
    <CarousalContext.Provider value={provider}>
      {children}
    </CarousalContext.Provider>
  );
};
