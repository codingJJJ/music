import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
const usePlayer = (url: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);

  useEffect(() => {}, []);

  return {
    playing,
    setPlaying,
    volume,
    setVolume,
    audioRef,
    src: url,
  };
};

export default usePlayer;
