import React, { useCallback, useState } from "react";
const BUFFER = 10;
const Virtualisation = ({ width, height, itemHeight, list }) => {

  const tempEndIndices = Math.floor(height / itemHeight);
  const [indices, setIndices] = useState([0, tempEndIndices]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.target;
      const startIndices = Math.floor(scrollTop / itemHeight);
      const endIndices = startIndices + tempEndIndices;
      setIndices([startIndices, endIndices]);
    },
    [tempEndIndices, itemHeight]
  );

  const start = Math.max(0, indices[0] - BUFFER);
  const end = Math.min(list.length, indices[1] + BUFFER);
  const windowList = list.slice(start, end);

  return (
    <div
      style={{
        height,
        width,
        backgroundColor: "#ccc",
        overflow: "auto",
        overflowX: "hidden",
        padding: "4px 0px",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {windowList.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                border: "2px solid #fff",
                padding: "2px 4px",
                width: "100%",
              }}
            >
              item : {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Virtualisation;
