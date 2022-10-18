import React, { useEffect, useRef } from "react";
import styles from "./index.module.less";

const PlayerProcess = ({ value, onChange, width = 400, wrapRef }) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isDrag = useRef<boolean>(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const memoProgress = useRef<number>(0);

  useEffect(() => {
    console.log(value);

    if (!isDrag.current) {
      console.log(width, value, "px");
      console.log(width * value - 12);

      fillRef.current!.style.width = width * value + "px";
      thumbRef.current!.style.transform = `translate(${
        width * value - 12
      }px, -4px)`;
    }
  }, [value]);

  // event
  useEffect(() => {
    // let isDrag = { current: false };
    // let progress;
    const mousedown = (e: any) => {
      console.log(e.target!.className);

      if (
        e.target!.className === styles.progress ||
        e.target!.className === styles.fill
      ) {
        // console.log(progress);
        if (!isDrag.current) {
          fillRef.current!.style.width = e.offsetX + "px";
          thumbRef.current!.style.transform = `translate(${
            e.offsetX - 12
          }px, -4px)`;
        }
      } else if (
        e.target!.className === styles.thumb ||
        e.target!.className === styles.inner
      ) {
        isDrag.current = true;
        console.log("down");
      }
    };
    const mousemove = (e) => {
      e.stopPropagation();

      if (isDrag.current) {
        // console.log(e.clientX);
        memoProgress.current! = +(
          ((e.pageX - progressRef.current!.offsetLeft) / width) *
          100
        ).toFixed(0);
        const offset = Math.max(
          Math.min(e.pageX - progressRef.current!.offsetLeft, 400),
          0
        );
        fillRef.current!.style.width = offset + "px";
        thumbRef.current!.style.transform = `translate(${offset - 12}px, -4px)`;
      }
    };
    const mouseup = (e) => {
      e.stopPropagation();
      if (isDrag.current && isDrag.current) {
        isDrag.current = false;
        console.log("up");
        if (typeof onChange === "function") {
          console.log(memoProgress.current);

          onChange(memoProgress.current);
        }
      }
    };

    progressRef.current?.addEventListener("mousedown", mousedown);

    // thumbRef.current?.addEventListener("mousedown", mousedown);

    document?.addEventListener("mousemove", mousemove);

    // thumbRef.current?.addEventListener("mouse", mousemove);
    document?.addEventListener("mouseup", mouseup);
    return () => {};
  }, []);

  const onprogressClick = (e) => {
    // console.log(e.target.offsetX);
    // if (e.target.className === styles.progress) {
    //   console.log(e.screenX - e.clientX);
    // }
  };

  return (
    <div
      className={styles.progress}
      style={{ width }}
      onClick={onprogressClick}
      ref={progressRef}
    >
      <div className={styles.fill} ref={fillRef}></div>
      <div
        ref={thumbRef}
        className={styles.thumb}
        style={{ transform: `translate(16px, -4px)` }}
      >
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default PlayerProcess;
