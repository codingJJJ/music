import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => {
    playing ? audioRef.current?.pause() : audioRef.current?.play();
  };
  useEffect(() => {
    audioRef.current!.addEventListener("playing", () => {
      setPlaying(true);
    });
    audioRef.current!.addEventListener("pause", () => {
      setPlaying(false);
    });
    audioRef.current!.addEventListener("play", () => {
      console.log(1);
    });
  });
  useEffect(() => {
    audioRef.current!.addEventListener("playing", () => {
      console.log("playing");
    });
    audioRef.current!.addEventListener("ontimeUpdate", (e) => {
      console.log(e);
    });
    window.a = audioRef.current;
    audioRef.current?.PROCESSING_INSTRUCTION_NODE;
  });

  return (
    <div>
      <audio
        ref={audioRef}
        controls={true}
        src="http://localhost:8080/%E6%97%A5%E4%B8%8D%E8%90%BD.mp3"
      >
        123
      </audio>
      <div onClick={play}>{playing ? "暂停" : "播放"}</div>
    </div>
  );
};

export default App;
