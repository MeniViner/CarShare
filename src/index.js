import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './utils/i18next'; //this is for the translate 


ReactDOM.createRoot(document.getElementById('root')).render(<App />);

document.documentElement.dir = "rtl";