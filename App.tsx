import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Player from "./src/components/player";

type AppProps = {
  pre?: () => void;
  next?: () => void;
  src: string;
};

const App: React.FC<AppProps> = ({ pre, next }) => {
  return <Player url="./public/didu.mp3" />;
};

export default App;
