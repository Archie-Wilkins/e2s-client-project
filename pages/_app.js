import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/navbar.css';
import '../styling/colours.css';
import '../styling/login.css';
import '../styling/adminHub.css';


export default function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    );
}