import Link from "next/link"
import MasterNavBar from "../public/components/masterNavBar.js"



function HelpPage() {
    return <div>
        <MasterNavBar />
        <p>Help</p>

        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div >
}

export default HelpPage