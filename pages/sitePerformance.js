import Link from "next/link"


function SitePerformancePage() {
    return <div  aria-label="site performance page">
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default SitePerformancePage