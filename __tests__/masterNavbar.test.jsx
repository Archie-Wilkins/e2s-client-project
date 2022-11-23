// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import MasterNavBar from "../public/components/layouts/masterNavBar";

describe('master nav bar admin side bar', () => {
    it('renders admin bar when isAdmin is true', () => {
        render(<MasterNavBar isAdmin={true} />)

        const onboarding = screen.getByText("Onboarding")


        expect(onboarding).toBeInTheDocument()
    })
    it('renders ESM side bar when isAdmin is false', () => {
        render(<MasterNavBar isAdmin={false} />)

        const onboardingLinks = screen.queryAllByText('onboarding')
        expect(onboardingLinks).toHaveLength(0)
    })
})

describe('master nav bar director side bar', () => {
    it('renders director bar when isDirector is true', () => {
        render(<MasterNavBar isDirector={true} />)

        const admin = screen.getByText("Admin")
        expect(admin).toBeInTheDocument()
    })
    it('does not render admin links', () => {
        render(<MasterNavBar isDirector={false} />)

        const onboardingLinks = screen.queryAllByText('onboarding')
        expect(onboardingLinks).toHaveLength(0)
    })
    it('renders ESM side bar when isAdmin is false', () => {
        render(<MasterNavBar isDirector={false} />)

        const adminButtons = screen.queryAllByText('Admin')
        expect(adminButtons).toHaveLength(0)
    })
})





