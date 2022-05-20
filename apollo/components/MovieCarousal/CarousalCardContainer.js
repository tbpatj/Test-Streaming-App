import { useContext } from "react";
import { DataContext } from "../Context/GlobalData";
import { CarousalContext } from "./CarContext/CarProvider";
import calculateCardOffset from "./OffsetCalc";
import MovieCard from "../MovieCard/MovieCard";

export default function CarousalCard({ index }) {
  const { movies, selectedRow, posterOpened, dispatch } =
    useContext(DataContext);

  const { selIndex, carOffset, movIds, cardOpened, carDispatch, carousalID } =
    useContext(CarousalContext);
  let movie = {};
  if (movies[movIds[index]]) {
    movie = movies[movIds[index]];
  }
  let { offset, offscreen, render } = calculateCardOffset(
    carOffset,
    index,
    selIndex,
    movIds.length,
    cardOpened
  );

  function handleClick() {
    carDispatch({
      type: "setSelIndex",
      data: {
        selIndex: index,
        cardOpened: true,
        dispatch,
        selectedRow: selectedRow,
      },
    });
    // setOffset(index * 200 - window.innerWidth / 2 - 200);
    // setSelected(index);
    if (!posterOpened) {
      dispatch({
        type: "setOpened",
        data: { status: true },
      });
    }
  }

  if (!render) return null;

  return (
    <div
      id={`c-${index}`}
      style={{
        position: "absolute",
        left: `${offset}px`,
        top: `${selIndex === index ? "0px" : cardOpened ? "50px" : "0px"}`,
        transition: `${offscreen ? "0s" : "0.5s"}`,
      }}
      onClick={() => handleClick()}
    >
      <MovieCard movie={movie} selected={cardOpened && selIndex === index} />
    </div>
  );
}
