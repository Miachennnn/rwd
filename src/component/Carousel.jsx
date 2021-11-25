import React, { useEffect, useState } from "react";
import "../style/carousel.scss";

const getNextImg = (currentData, total) => {
  if (currentData.direction === "reverse") {
    if (currentData.index === 0) {
      return { direction: "forward", index: currentData.index + 1 };
    }
    return { direction: "reverse", index: currentData.index - 1 };
  } else {
    if (currentData.index + 1 >= total) {
      return { direction: "reverse", index: currentData.index - 1 };
    } else {
      return { direction: "forward", index: currentData.index + 1 };
    }
  }
};

const Carousel = ({ pics }) => {
  const [currentData, setCurrentData] = useState({
    direction: "forward",
    index: 0,
  });
  useEffect(() => {
    const delay = 6000;
    const slide = setInterval(
      () => setCurrentData(currentData => getNextImg(currentData, pics.length)),
      delay
    );
    return () => clearInterval(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="carousel">
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translateX(-${(100 / pics.length) * currentData.index}%)`,
          transition: "transform 4s ease",
        }}
      >
        {pics.map((pic, index) => (
          <div
            className="carousel-item"
            key={index}
            style={{ backgroundImage: `url(${pic})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
