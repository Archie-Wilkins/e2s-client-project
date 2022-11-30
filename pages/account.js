import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from 'next/router'

function AccountPage() {
    return <div>
        <Link href="/"><p>Home</p></Link>
        <Link href="/contact"><p>Contact Us Page</p></Link>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div>
}

export default AccountPage