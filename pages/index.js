import Link from "next/link"
import Cookies from "universal-cookie";




/*export default class extends Component {
    render () {
        return (
            <div>Your Next.js App</div>
        )
    }
}*/

function HomePage() {
    const cookies = new Cookies();
    console.log("userSession ID: " + cookies.get('user'));
    return <div>
        <Link href="/contact"><p>Contact Us Page</p>
        </Link>
        <Link href="/about"><p>About Us Page</p></Link>
        <h1 className="blueBackground">Hello</h1>
    </div>
}

export default HomePage
