import Link from "next/link"
import Cookies from "universal-cookie";
import LandingComponent from "../public/components/landingComponent.js"

function HomePage() {
    const cookies = new Cookies();
    console.log("userSession ID: " + cookies.get('user'));
    return <div className="LandingBackground">
        <LandingComponent />
    </div>
}

export default HomePage
