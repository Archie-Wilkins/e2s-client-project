import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/sideNavbar.css";
import "../styling/topNavbar.css";
import "../styling/colours.css";
import "../styling/mainLayout.css";
import "../styling/text.css";
import "../styling/size.css";
import "../styling/graphs.css";
import "../styling/forms.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
