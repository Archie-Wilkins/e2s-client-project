import Link from "next/link"


function DirectorDashboardPage() {
    return <div aria-label="director dashboard page content">
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default DirectorDashboardPage