import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <button
        onClick={() => navigate("/send")}
        style={{
          marginTop: "20px",
        }}
      >
        Send
      </button>
      <button onClick={() => navigate("/swap")}>Swap</button>
    </div>
  );
};

export default Home;
