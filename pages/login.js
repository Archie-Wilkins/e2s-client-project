import Link from "next/link"
<<<<<<< HEAD


function LoginPage() {
    return <div>
        <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
=======
import LoginComponent from "../public/components/loginComponent.js"

function LoginPage() {
    return <div className="LoginBackground">
        <LoginComponent />
>>>>>>> ad52b33c0831be4f1214b696665fdf9ed8393107
    </div>
}

export default LoginPage