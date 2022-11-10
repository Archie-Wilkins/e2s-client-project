import Link from "next/link"


function HomePage() {
    return <div>
        <Link href="/contact"><p>Contact Us Page</p>
        </Link>
        <Link href="/about"><p>About Us Page</p></Link>
    </div>
}

export default HomePage
