import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const btnRegister = document.getElementById("btnRegister")

btnRegister.addEventListener("click", ()=> {
    ReactDOM.render(<App/>, document.getElementById("root"));
})
