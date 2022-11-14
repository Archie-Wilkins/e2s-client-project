import Link from "next/link"
import NavBar from "./components/navBar.js"

function AboutUsPage() {
    return <div>
        <NavBar />
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default AboutUsPage