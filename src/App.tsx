import React, { useEffect, useRef, useState } from "react";
import "./App.css";

type valueTypes = {
  src: string;
  name: string;
};

const App = () => {
  const LeftDivRef = useRef<HTMLDivElement | null>(null);
  const RightDivRef = useRef<HTMLDivElement | null>(null);

  const [leftValues, setLeftValues] = useState<valueTypes[]>([
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
    {
      src: "./logo.svg",
      name: "sun !!",
    },
  ]);

  const [rightValues, setRightValues] = useState<valueTypes[]>([]);

  const [leftDivPosition, setLeftDivPosition] = useState<
    Record<string, number>
  >({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    // left_top: 0,
    // left_bottom: 0,
    // right_top: 0,
    // right_bottom: 0,
  });
  const [rightDivPosition, setRightDivPosition] = useState<
    Record<string, number>
  >({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    // console.log("onDrag");
    // console.log(e);
  };

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // e.dataTransfer.setDragImage();
  };

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    // console.log("dragEnd!!");

    const { clientX } = e;
    const { clientY } = e;
    //현재 위치를 구하고

    if (
      leftDivPosition.left <= clientX &&
      clientX <= leftDivPosition.right &&
      leftDivPosition.top <= clientY &&
      clientY <= leftDivPosition.bottom
    ) {
      //마우스를 놓았을때 leftBox 영역에 잇으면,
      const arr = [...rightValues];
      //rightValues에서 idx번째를 빼내서
      const removedItem = arr.splice(idx, 1);

      setLeftValues((p) => {
        return [...p, ...removedItem];
      }); //빼낸 값을 leftValues에 넣고
      setRightValues(arr);
      //빼낸 나머지 값을 right에 넣는다.
    } else if (
      //오른쪽 박스 영역이라면
      rightDivPosition.left <= clientX &&
      clientX <= rightDivPosition.right &&
      rightDivPosition.top <= clientY &&
      clientY <= rightDivPosition.bottom
    ) {
      const arr = [...leftValues];
      const removedItem = arr.splice(idx, 1);
      setRightValues((p) => [...p, ...removedItem]);
      setLeftValues(arr);
    }
  };

  const onDragEnter = (e: any) => {
    console.log("enenenen");
  };

  useEffect(() => {
    if (!LeftDivRef.current || !RightDivRef.current) return;

    const leftBoxRect = LeftDivRef.current.getBoundingClientRect();
    const rightBoxRect = RightDivRef.current.getBoundingClientRect();

    setLeftDivPosition({
      left: leftBoxRect.left,
      right: leftBoxRect.right,
      top: leftBoxRect.top,
      bottom: leftBoxRect.bottom,
    });

    setRightDivPosition({
      left: rightBoxRect.left,
      right: rightBoxRect.right,
      top: rightBoxRect.top,
      bottom: rightBoxRect.bottom,
    });
  }, []);

  return (
    <div className="app">
      <div
        className="container"
        ref={LeftDivRef}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
      >
        {leftValues.map((v, idx) => (
          // <div className="wrap" >
          <div
            className="wrap"
            // onDrag={onDrag}
            // onDragEnter={(e) => {
            //   e.preventDefault();
            // }}
            // onDragOver={(e) => {
            //   // console.log("ovovovo");
            //   e.preventDefault();
            // }}
            draggable
            // onDrop={(e) => {
            //   console.log(e.target);
            // }}
            onDragStart={onDragStart}
            onDragEnd={(e) => onDragEnd(e, idx)}
          >
            <img src={v.src} style={{ width: "90px" }} alt="" />{" "}
            <div>{v.name}</div>
          </div>
        ))}
      </div>
      <div
        className="container"
        ref={RightDivRef}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
      >
        {rightValues.map((v, idx) => (
          // <div className="wrap" >
          <div
            className="wrap"
            // onDrag={onDrag}
            // onDragEnter={(e) => {
            //   e.preventDefault();
            // }}
            // onDragOver={(e) => {
            //   // console.log("ovovovo");
            //   e.preventDefault();
            // }}
            draggable
            // onDrop={(e) => {
            //   console.log(e.target);
            // }}
            onDragStart={onDragStart}
            onDragEnd={(e) => onDragEnd(e, idx)}
          >
            <img src={v.src} style={{ width: "90px" }} alt="" />{" "}
            <div>{v.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
