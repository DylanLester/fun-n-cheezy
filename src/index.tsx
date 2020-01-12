import React from "react"
import ReactDOM from "react-dom"
import Modal from "react-modal"

import App from "./components/App"
import * as serviceWorker from "./serviceWorker"

const applicationContainer = document.getElementById("root")

// @ts-ignore
Modal.setAppElement(applicationContainer)

ReactDOM.render(<App />, applicationContainer)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
