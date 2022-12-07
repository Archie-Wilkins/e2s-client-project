import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import Dashboard from "../pages/admin/dashboard";

describe('admin dashboard', () => {

    beforeEach(() => {
        render(<Dashboard/>)
    })


    it('renders an admin nav bar', () => {
        const navOnboarding = screen.getByText("Onboarding")
        expect(navOnboarding).toBeInTheDocument()
    })

    it('renders an admin nav bar', () => {
        const title = screen.getByText("ADMIN DASHBOARD")
        expect(title).toBeInTheDocument()
    })

})