import Link from "next/link"

function AboutUsPage() {
    return <div aria-label="about us page content">
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default AboutUsPage