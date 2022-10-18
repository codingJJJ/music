import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
const usePlayer = (src, el) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {}, []);

  return {
    playing,
    setPlaying,
  };
};
