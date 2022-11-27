import Link from "next/link"
import NavBar from "../public/components/navBar.js"

function AboutUsPage() {
    return <div>
        <NavBar />
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        <a className="nav-link" href="#">Features</a>
                        <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link disabled"
                        >Disabled</a
                        >
                    </div>
                </div>
                <h1>About Page</h1>
            </div>
        </nav>
    </div>
}

export default AboutUsPage