import React from "react";
import type { FC } from "react";
import usePlayer from "./usePlayer";
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

  const onProgressChange = useCallback(
    (e: number) => {
      const a = audioRef.current?.duration;
      duration;
      setCurrentTime((e / 100) * audioRef.current!.duration);
    },
    [duration]
  );
  return (
    <div className={styles.container}>
      <div className={styles.palyer}>
        <audio ref={audioRef} src={src}>
          当前浏览器不支持该播放器
        </audio>
        <span>上一曲</span>
        <div onClick={play}>{playing ? "暂停" : "播放"}</div>
        <div>下一曲</div>
        <div className={styles.heartShape}>{playing ? "♥" : "♡"}</div>
        <PlayerProcess value={progress} onChange={onProgressChange} />
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
