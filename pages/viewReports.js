import Link from "next/link"


function ViewReportsPage() {
    return <div  aria-label="view reports page">
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default ViewReportsPage