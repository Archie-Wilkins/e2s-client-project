// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import AdminNavBar from "../public/components/adminNavBar";

describe('dashboard', () => {
    it('renders a dashboard tab', () => {
        render(<AdminNavBar />)

        const dashboard = screen.getByText("Dashboard")


        expect(dashboard).toBeInTheDocument()
    })
})

describe('has forecasting tab', () => {
    it('renders a forecasting tab', () => {
        render(<AdminNavBar />)

        const onboarding = screen.getByText("Onboarding")

        // expect(dashboard).toBeInTheDocument()
        expect(onboarding).toBeInTheDocument()

    })

})





