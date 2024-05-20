import { Route, Routes } from "react-router-dom";

import Swap from "./Swap";
import Send from "./send/Send";
import Home from "./home/Home";

export const RouterComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/send" element={<Send />}></Route>
        <Route path="/swap" element={<Swap />}></Route>
      </Routes>
    </>
  );
};
