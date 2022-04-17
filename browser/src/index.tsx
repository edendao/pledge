import "./index.css"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import React from "react"
import ReactDOM from "react-dom"
import { Helmet } from "react-helmet"
import Modal from "react-modal"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

dayjs.extend(utc)
Modal.setAppElement("#root")

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>Towards a Eden Dao</title>

      {/* <!-- Social media tags --> */}
      <meta property="og:type" content="article" />

      <meta property="og:title" content="Towards a Eden Dao" />

      <meta
        property="og:description"
        content="Introducing the pluriverse as a banner for new, communal futures and a Pattern Language for a world where many worlds may fit"
      />

      <meta property="og:site_name" content="Eden Dao" />

      <meta name="twitter:title" content="Towards a Eden Dao" />

      <meta
        name="twitter:description"
        content="Introducing the pluriverse as a banner for new, communal futures and a Pattern Language for a world where many worlds may fit"
      />

      <meta name="twitter:site" content="@verses_xyz" />

      <meta name="twitter:creator" content="@verses_xyz" />
    </Helmet>
    <Router>
      {/* routes */}
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
