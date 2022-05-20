import { useState, useEffect } from "react";

//this function creates the background image change shift effect
//it implements a interval timer upon opening of the card, and destroys it when the component unmount

export default function UseShiftEffect(Images, transitionTime) {
  const [imageIndex, setImageIndex] = useState(0);
  const [transitionState, setTransitionState] = useState(1);

  useEffect(() => {
    if (Images !== undefined) {
      if (Images.length > 0) {
        //create an new interval because we haven't created one yet
        let intervalID = setInterval(() => {
          //reset the transition state
          setTransitionState(0);
          //create a callback function to update the image index
          setImageIndex((prevCounter) => {
            if (prevCounter + 1 > Images.length - 1) {
              return 0;
            } else {
              return Number(prevCounter) + 1;
            }
          });
        }, transitionTime);
        // when the component unmounts it will clean up the interval
        return () => {
          clearInterval(intervalID);
        };
      }
    }
  }, [Images]);

  return { imageIndex, transitionState, setTransitionState };
}
