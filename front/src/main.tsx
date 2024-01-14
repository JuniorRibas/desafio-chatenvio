import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ChatRoom from "./pages/Chat.tsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <div className="wrapper">
      <div className="app-container">
        <div className="app-container__content">
          <>
            <ChatRoom />
          </>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
