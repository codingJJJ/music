import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

// GiPreviousButton
// GiNextButton
// state
// src 歌曲的路径
// preload 是否在页面加载后立即加载（设置 autoplay 后无效）
// controls 显示 audio 自带的播放控件
// loop 音频循环
// autoplay 音频加载后自动播放
// currentTime 音频当前播放时间
// duration 音频总长度
// ended 音频是否结束
// muted 音频静音为 true
// volume 当前音频音量
// readyState 音频当前的就绪状态

// event
//abort 当音频/视频的加载已放弃时
// canplay 当浏览器可以播放音频/视频时
// canplaythrough 当浏览器可在不因缓冲而停顿的情况下进行播放时
// durationchange 当音频/视频的时长已更改时
// emptied 当目前的播放列表为空时
// ended 当目前的播放列表已结束时
// error 当在音频/视频加载期间发生错误时
// loadeddata 当浏览器已加载音频/视频的当前帧时
// loadedmetadata 当浏览器已加载音频/视频的元数据时
// loadstart 当浏览器开始查找音频/视频时
// pause 当音频/视频已暂停时
// play 当音频/视频已开始或不再暂停时
// playing 当音频/视频在已因缓冲而暂停或停止后已就绪时
// progress 当浏览器正在下载音频/视频时
// ratechange 当音频/视频的播放速度已更改时
// seeked 当用户已移动/跳跃到音频/视频中的新位置时
// seeking 当用户开始移动/跳跃到音频/视频中的新位置时
// stalled 当浏览器尝试获取媒体数据，但数据不可用时
// suspend 当浏览器刻意不获取媒体数据时
// timeupdate 当目前的播放位置已更改时
// volumechange 当音量已更改时
// waiting 当视频由于需要缓冲下一帧而停止

const usePlayer = (url: string = "http://localhost:3000/日不落.mp3") => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    audioRef.current!.addEventListener("playing", () => {
      setPlaying(true);
    });
    audioRef.current!.addEventListener("pause", () => {
      setPlaying(false);
    });
    audioRef.current!.addEventListener("play", () => {});
    return () => {};
  });

  useEffect(() => {
    audioRef.current!.addEventListener("playing", () => {});
    audioRef.current!.addEventListener("timeupdate", (e) => {
      setCurrentTime(audioRef.current!.currentTime.toFixed(2));
      const progress =
        +(
          (audioRef.current!.currentTime / audioRef.current!.duration) *
          100
        ).toFixed(0) || 0;
      const formatProgress = isNaN(+progress) ? 0 : progress;
      console.log({ formatProgress: formatProgress / 100 });

      setProgress(formatProgress / 100);
    });
  });

  const onCurrentTimeChange = (currentTime) => {
    audioRef.current!.currentTime = currentTime;
    setCurrentTime(currentTime);
  };

  const duration = useMemo(() => {
    return (audioRef.current?.duration || 0).toFixed(2);
  }, [url]);

  return {
    playing,
    setPlaying,
    volume,
    setVolume,
    audioRef,
    src: url,
    currentTime,
    setCurrentTime: onCurrentTimeChange,
    get duration() {
      return (audioRef.current?.duration || 0).toFixed(2);
    },
    progress,
    setProgress,
    play: () => {
      playing ? audioRef.current?.pause() : audioRef.current?.play();
    },
  };
};

export default usePlayer;
