import React from "react";
import type { FC } from "react";
import usePlayer from "./usePlayer";

type PlayerProps = {
  next: () => void;
  pre: () => void;
  url: string;
};
const Player: FC<PlayerProps> = ({ next, pre, url }) => {
  const { src, audioRef } = usePlayer(url);
  return (
    <div>
      <audio ref={audioRef} src={src}>
        当前版本不支持该浏览器
      </audio>
    </div>
  );
};

export default Player;
