import UseShiftEffect from "./UseShiftEffect";
import UseImageLoad from "./UseImageLoad";

export default function BackgroundImage({ movie, transitionTime }) {
  const { loading } = UseImageLoad(movie);
  const { imageIndex, transitionState, setTransitionState } = UseShiftEffect(
    movie.Images,
    transitionTime
  );

  if (loading || !movie.Images) {
    return <div>loading</div>;
  }

  return (
    <div>
      <img
        id="image-1"
        className={`hero-img ${transitionState !== 0 ? "hero-img-show" : ""}`}
        src={
          movie.Images[
            Number(
              transitionState !== 0
                ? imageIndex
                : Number(imageIndex - 1) >= 0
                ? Number(imageIndex) - 1
                : movie.Images.length - 1
            )
          ]
        }
      />
      <img
        onTransitionEnd={() => setTransitionState(1)}
        id="image-2"
        className={`hero-img ${
          transitionState === 0 ? "hero-img-show" : "hero-img-none"
        }`}
        src={
          movie.Images[
            Number(
              transitionState === 0
                ? imageIndex
                : Number(imageIndex + 1) < movie.Images.length
                ? Number(imageIndex) + 1
                : 0
            )
          ]
        }
      />
    </div>
  );
}
