import { useEffect, useRef, useState } from "react";

const Player = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("mounted");
  }, []);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }
    const updateWidth = setInterval(() => {
      if (divRef.current) {
        const widthString = divRef.current.style.width.split("%");
        const width = Number(widthString[0]) + 10;
        if (width <= 100) {
          divRef.current.style.width = `${width}%`;
        } else {
          divRef.current.style.width = "0%";
        }
      }
    }, 500);
    return () => clearInterval(updateWidth);
  }, []);

  return (
    <div ref={divRef} style={{ width: "0%", height: 20, background: "#ccc" }} />
  );
};

export default Player;
