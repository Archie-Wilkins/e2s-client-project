import Link from "next/link"




/*export default class extends Component {
    render () {
        return (
            <div>Your Next.js App</div>
        )
    }
}*/

function HomePage() {
    console.log("userSession ID: " + cookies.get('user'));
    return <div>
        <Link href="/contact"><p>Contact Us Page</p>
        </Link>
        <Link href="/about"><p>About Us Page</p></Link>
        <h1 className="blueBackground">Hello</h1>
    </div>
}

export default HomePage
