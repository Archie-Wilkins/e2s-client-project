import Link from "next/link"


function AdminDashboard() {
    return <div>
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default AdminDashboard()