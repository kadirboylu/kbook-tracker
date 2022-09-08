import React from "react";
import Flickity from "react-flickity-component";

import "./Flickity.css";

const flickityOptions = {
  groupCells: true,
  contain: true,
  pageDots: false,
  draggable: true,
};

export const Carousel = (props) => {
  return <Flickity options={flickityOptions}>{props.children}</Flickity>;
};
