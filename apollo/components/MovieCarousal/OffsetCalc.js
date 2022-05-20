export default function calculateCardOffset(
  offset,
  cIndex,
  selIndex,
  listLen,
  expandedView
) {
  let offscreen = false;
  let render = true;
  let cardOffset =
    selIndex < cIndex && expandedView
      ? cIndex * 200 - offset
      : cIndex * 200 - offset - 620;

  if (cardOffset > window.innerWidth + 1000) {
    cardOffset = (cIndex - listLen) * 200 - offset - 620;
  }
  if (cardOffset < -1000) {
    cardOffset = (cIndex + listLen) * 200 - offset - (expandedView ? 0 : 620);
  }
  if (cardOffset > window.innerWidth * 2) {
    // offscreen = true;
  }
  if (cardOffset < -window.innerWidth * 3) {
    offscreen = true;
  }

  if (
    cardOffset > window.innerWidth * 4 ||
    cardOffset < -window.innerWidth * 2
  ) {
    render = false;
  }

  return { offset: cardOffset, offscreen, render };
}
