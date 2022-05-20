import { useContext } from "react";
import { DataContext } from "../Context/GlobalData";
import CardCarousal from "./CarousalCardContainer";
import { CarousalContext } from "./CarContext/CarProvider";

function getDisplayList(offsetAmount, selIndex, movIds) {
  //declare the variables to be used
  let overflowStartMovies = [];
  let overflowEndMovies = [];
  let combinedList = [];
  //declare the start and end indicies
  let indxSt = selIndex - offsetAmount;
  let indxEnd = selIndex + offsetAmount;

  if (indxSt <= 0) {
    overflowEndMovies = movIds.slice(movIds.length - 1 + indxSt, movIds.length);

    indxSt = 0;
  }

  if (indxEnd >= movIds.length) {
    overflowStartMovies = movIds.slice(0, indxEnd - movIds.length);
    indxEnd = movIds.length;
  }
  let movIdsMap = movIds.slice(indxSt, indxEnd);

  for (let i = 0; i < overflowStartMovies.length; i++) {
    combinedList.push({ index: i, value: overflowStartMovies[i] });
  }
  for (let i = 0; i < movIdsMap.length; i++) {
    combinedList.push({ index: i + indxSt, value: movIdsMap[i] });
  }
  for (let i = 0; i < overflowEndMovies.length; i++) {
    combinedList.push({
      index: i + movIds.length - overflowEndMovies.length,
      value: overflowEndMovies[i],
    });
  }
  return combinedList;
}

export default function MovieCarousal({ id }) {
  const { dispatch, posterOpened, selectedRow } = useContext(DataContext);
  const { movIds, selIndex, cardOpened, carDispatch } =
    useContext(CarousalContext);

  function updateSelIndex(index) {
    if (index < 0) index = movIds.length + index;
    else if (index >= movIds.length) index = index - movIds.length;
    // dispatch({
    //   type: "setOpened",
    //   data: { status: false },
    // });

    carDispatch({
      type: "setSelIndex",
      data: {
        selIndex: index,
        dispatch,
        carOpened: false,
        selectedRow: selectedRow,
      },
    });
  }
  //calculate the div height based on if a card is opened
  const divHeight = cardOpened && posterOpened ? "500px" : "300px";
  const combinedList = getDisplayList(
    Math.floor((window.innerWidth * 4) / 187),
    selIndex,
    movIds
  );
  return (
    <div className="movies-container" style={{ height: divHeight }}>
      {/* left and right buttons */}
      <div
        className="right-button"
        onClick={() => updateSelIndex(selIndex + 5)}
      ></div>
      <div
        className="left-button"
        onClick={() => updateSelIndex(selIndex - 5)}
      ></div>

      {/* actual cards to map through */}
      {combinedList.map((item) => {
        return (
          <CardCarousal key={`cc-${id}-${item.index}`} index={item.index} />
        );
      })}
    </div>
  );
}
