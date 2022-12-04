import Link from "next/link"


function DashboardPage() {
    return <div>
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default DashboardPage