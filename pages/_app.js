import '../styling/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/navbar.css';
import '../styling/colours.css';
import '../styling/login.css';
import { useEffect } from "react";
import React from "react";



export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);
    return <Component {...pageProps} />
}




