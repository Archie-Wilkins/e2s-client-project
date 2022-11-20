import Link from "next/link"


function HelpPage() {
    return <div>
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
}

export default HelpPage