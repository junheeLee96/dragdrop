import React, { useEffect } from "react";
import "./App.css";

const values = [
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
  {
    src: "https://source.unsplash.com/random/sun",
    name: "sun !!",
  },
];

const App = () => {
  useEffect(() => {
    const Drag = () => {
      console.log("drag!!");
    };

    const $wrap = document.querySelectorAll(".wrap");
    console.log($wrap);

    $wrap.forEach((el) => {
      el.addEventListener("mousedown", Drag);
    });

    return () => {
      $wrap.forEach((el) => {
        el.removeEventListener("mousedown", Drag);
      });
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        {values.map((v) => (
          <div className="wrap">
            <img src={v.src} style={{ width: "90px" }} alt="" />{" "}
            <div>{v.name}</div>
          </div>
        ))}
      </div>
      <div className="container">g</div>
    </div>
  );
};

export default App;
