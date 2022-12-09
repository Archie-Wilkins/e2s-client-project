import Link from "next/link"


function OnboardingPage() {
    return <div aria-label="onboarding page">
       <Link href="/"><p>Home</p>
        </Link>
        <Link href="/contact"><p>Contact-Us Page</p></Link>
    </div>
}

export default OnboardingPage