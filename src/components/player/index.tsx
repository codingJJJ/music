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
      const a = audioRef.current?.duration;
      duration;
      setCurrentTime((e / 100) * audioRef.current?.duration);
      // setCurrentTime
    },
    [duration]
  );
  return (
    <div className={styles.container}>
      <div className={styles.palyer}>
        <audio ref={audioRef} src={src}>
          当前版本不支持该浏览器
        </audio>
        {/* <GiPreviousButton size={24} /> */}
        <span>上一曲</span>
        {/* <div className={styles.playButtonWrap} onClick={play}>
          <GiPlayButton style={{ display: "inline-block" }} size={24} />
        </div> */}
        <div onClick={play}>{playing ? "暂停" : "播放"}</div>
        {/* <GiNextButton size={24} /> */}
        <div>下一曲</div>
        {/* <div className={styles.heartShape}></div> */}
        <div className={styles.heartShape}>{playing ? "♥" : "♡"}</div>
        {/* 
        <TfiLoop size={24} /> */}
        <PlayerProcess value={progress} onChange={onProgressChange} />
        {/* <BiVolumeFull size={24} /> */}
        <div>声音</div>
        <div>循环</div>
        <span>
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default Player;
