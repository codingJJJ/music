import React, { type FC, useEffect, useRef } from "react";
import styles from "./index.module.less";

type PlayerProcessProps = {
  defaultValue?: number;
  value: number;
  onChange?: (v: number) => void;
  width: number;
};

const PlayerProcess: FC<PlayerProcessProps> = ({
  defaultValue,
  value = defaultValue || 0,
  onChange,
  width = 400,
}) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isDrag = useRef<boolean>(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const memoProgress = useRef<number>(0);

  useEffect(() => {
    if (!isDrag.current) {
      fillRef.current!.style.width = width * value + "px";
      thumbRef.current!.style.transform = `translate(${
        width * value - 12
      }px, -4px)`;
    }
  }, [value]);

  // event
  useEffect(() => {
    const mousedown = (e: any) => {
      if (
        e.target!.className === styles.progress ||
        e.target!.className === styles.fill
      ) {
        if (!isDrag.current) {
          fillRef.current!.style.width = e.offsetX + "px";
          thumbRef.current!.style.transform = `translate(${
            e.offsetX - 12
          }px, -4px)`;
          if (typeof onChange === "function") {
            onChange?.((e.offsetX / width) * 100);
          }
        }
      } else if (
        e.target!.className === styles.thumb ||
        e.target!.className === styles.inner
      ) {
        isDrag.current = true;
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
        if (typeof onChange === "function") {
          onChange?.(memoProgress.current);
        }
      }
    };
    progressRef.current!.addEventListener("mousedown", mousedown);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    return () => {
      progressRef.current!.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
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
