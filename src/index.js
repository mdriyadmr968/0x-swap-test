import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { SwapProviders } from "./component/SwapProviders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SwapProviders>
    <App />
  </SwapProviders>
);
