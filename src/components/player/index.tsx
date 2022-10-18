import React, { useEffect, useRef } from "react";
import type { FC } from "react";
import usePlayer from "./usePlayer";
import { GiPreviousButton, GiPlayButton, GiNextButton } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { TfiLoop } from "react-icons/tfi";
import styles from "./index.module.less";
import PlayerProcess from "./player-progress";
import { useCallback } from "react";
import { formatTime } from "./utils";
type PlayerProps = {
  next?: () => void;
  pre?: () => void;
  url: string;
};
const Player: FC<PlayerProps> = ({ next, pre, url }) => {
  const {
    playing,
    setPlaying,
    volume,
    setVolume,
    audioRef,
    src,
    currentTime,
    setCurrentTime,
    duration,
    progress,
    setProgress,
    play,
  } = usePlayer(url);
  const progressRef = useRef<HTMLInputElement>(null);
  const rangeChange = (e) => {
    // console.log(e.target.value);
  };

  const isDrag = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  window.sss = progressRef.current;
  // useEffect(() => {
  //   console.log(isDrag.current);

  //   if (!isDrag.current) {
  //     console.log(progressRef.current!.value);

  //     progressRef.current!.value = progress;
  //   }
  //   console.log(2);
  // }, [progress]);
  const onProgressChange = useCallback(
    (e: number) => {
      console.log(e);
      console.log(duration);

      console.log((e / 100) * audioRef.current?.duration);
      const a = audioRef.current?.duration;
      duration;
      setCurrentTime((e / 100) * audioRef.current?.duration);
      // setCurrentTime
    },
    [duration]
  );
  return (
    <>
      <div className={styles.palyer}>
        <audio ref={audioRef} src={src}>
          当前版本不支持该浏览器
        </audio>
        <GiPreviousButton size={24} />
        <div className={styles.playButtonWrap} onClick={play}>
          <GiPlayButton style={{ display: "inline-block" }} size={24} />
        </div>

        <GiNextButton size={24} />

        <div className={styles.heartShape}></div>
        <BiVolumeFull size={24} />
        <TfiLoop size={24} />
        <PlayerProcess
          value={+currentTime / +duration}
          onChange={onProgressChange}
        />
        {false && (
          <p className={styles.progress}>
            <input
              ref={progressRef}
              className={styles.range}
              type="range"
              width={1200}
              onChange={rangeChange}
              defaultValue={0}
              // value={progress}
            />
            <span
              className={styles.fill}
              onMouseDown={() => {
                isDrag.current = true;
              }}
              onMouseUp={() => {
                // isDrag.current = false;
              }}
            ></span>
            {/* <label className={styles.current}>0</label> */}
          </p>
        )}
        <span>
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
      <div>{currentTime}</div>
      <div>{duration}</div>
      <div>{(50 / 100) * audioRef.current?.duration}</div>
    </>
  );
};

export default Player;
