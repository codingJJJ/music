import React from "react";
import type { FC } from "react";
import usePlayer from "./usePlayer";
import styles from "./index.module.less";
import PlayerProcess from "./player-progress";
import { useCallback } from "react";
import { formatTime } from "./utils";
import { ReactComponent as Heart } from "../../../public/heart.svg";
import { ReactComponent as PreviousIcon } from "../../../public/上一首.svg";
import { ReactComponent as NextIcon } from "../../../public/下一首.svg";
import { ReactComponent as LoopIcon } from "../../../public/循环播放.svg";
import { ReactComponent as VolumeIcon } from "../../../public/喇叭.svg";
import { ReactComponent as PlayIcon } from "../../../public/播放按钮.svg";

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
        <PreviousIcon width={18} height={18} />
        <div onClick={play} className={styles.playButton}>
          {playing ? (
            <PlayIcon width={22} height={22} />
          ) : (
            <PlayIcon width={22} height={22} />
          )}
        </div>
        <NextIcon width={18} height={18} />
        {/* {playing ? "♥" : "♡"} */}
        <Heart className={styles.heart} width={18} height={18} />
        <div className={styles.info}>
          <div className={styles.headimg}></div>
          <div>
            <div className={styles.title}>
              <span>歌曲名</span>
              <b>Up: 创作者</b>
            </div>
            <PlayerProcess value={progress} onChange={onProgressChange} />
          </div>
        </div>

        <VolumeIcon width={18} height={18} />
        <input type="range" color="red" style={{ margin: "0 2px" }} />
        <LoopIcon className={styles.loop} width={18} height={18} />
        {/* <span>
          {formatTime(currentTime)}/{formatTime(duration)}
        </span> */}
      </div>
    </div>
  );
};

export default Player;
