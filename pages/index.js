import Link from "next/link"
import React, { Component } from "react"

/*export default class extends Component {
    render () {
        return (
            <div>Your Next.js App</div>
        )
    }
}*/

function HomePage() {
    return <div>
        <Link href="/contact"><p>Contact Us Page</p>
        </Link>
        <Link href="/about"><p>About Us Page</p></Link>
    </div>
}

export default HomePage
