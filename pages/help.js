import Link from "next/link"


function HelpPage() {
    return <div>
<<<<<<< HEAD
        <Link href="/"><p>Home</p></Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>

        <form action="/account" method="post">
            <label htmlFor="first">First name:</label>
            <input type="text" id="first" name="first"/>
            <label htmlFor="last">Last name:</label>
            <input type="text" id="last" name="last"/>
            <button type="submit">Submit</button>
        </form>
    </div>
=======
        <p>Help</p>

        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div >
>>>>>>> ad52b33c0831be4f1214b696665fdf9ed8393107
}

export default HelpPage