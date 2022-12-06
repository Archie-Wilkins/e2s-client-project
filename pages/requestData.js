import Link from "next/link"


function RequestDataPage() {
    return <div  aria-label="request data page" >
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default RequestDataPage