import React, { type FC, useEffect, useRef } from "react";
import styles from "./index.module.less";

type PlayerProcessProps = {
  defaultValue?: number;
  value: number;
  onChange?: (v: number) => void;
  width?: number;
};

const PlayerProcess: FC<PlayerProcessProps> = ({
  defaultValue,
  value = defaultValue || 0,
  onChange,
  width = 400,
}) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  // 是否是拖动状态
  const isDrag = useRef<boolean>(false);
  const progressRef = useRef<HTMLDivElement>(null);
  // 记录progress的值
  const memoProgress = useRef<number>(0);

  useEffect(() => {
    if (!isDrag.current) {
      fillRef.current!.style.width = width * value + "px";
      thumbRef.current!.style.transform = `translate(${
        width * value - 12
      }px, -4px)`;
    }
  }, [value]);

  // bind event
  useEffect(() => {
    const mousedown = (e: MouseEvent) => {
      const isControlByprogress =
        (e.target as HTMLDListElement).className === styles.progress ||
        (e.target as HTMLDListElement).className === styles.fill;
      const isControlBythumb =
        (e.target as HTMLDListElement).className === styles.thumb ||
        (e.target as HTMLDListElement).className === styles.inner;
      if (isControlByprogress) {
        if (!isDrag.current) {
          setProgressStyle(fillRef.current!, thumbRef.current!, e.offsetX);
          onChange?.((e.offsetX / width) * 100);
        }
      } else if (isControlBythumb) {
        isDrag.current = true;
      }
    };
    const mousemove = (e: MouseEvent) => {
      e.stopPropagation();

      if (isDrag.current) {
        memoProgress.current! = +(
          ((e.pageX - progressRef.current!.offsetLeft) / width) *
          100
        ).toFixed(0);
        const offset = Math.max(
          Math.min(e.pageX - progressRef.current!.offsetLeft, 400),
          0
        );
        setProgressStyle(fillRef.current!, thumbRef.current!, offset);
      }
    };
    const mouseup = (e: MouseEvent) => {
      e.stopPropagation();
      if (isDrag.current && isDrag.current) {
        isDrag.current = false;
        onChange?.(memoProgress.current);
      }
    };

    progressRef.current!.addEventListener("mousedown", mousedown);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    return () => {
      // clean effects
      progressRef.current!.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  }, []);

  const setProgressStyle = (
    fillElement: HTMLDivElement,
    thumbElement: HTMLDivElement,
    offsetX: number
  ) => {
    fillElement.style.width = offsetX + "px";
    thumbElement.style.transform = `translate(${offsetX - 12}px, -4px)`;
  };

  return (
    <div className={styles.progress} style={{ width }} ref={progressRef}>
      <div className={styles.fill} ref={fillRef}></div>
      <div ref={thumbRef} className={styles.thumb}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default PlayerProcess;
