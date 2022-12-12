// __tests__/index.test.jsx

import {fireEvent, render, screen} from '@testing-library/react'
import Home from '../../../pages'
import '@testing-library/jest-dom'
import NavBar from "../../../public/components/layouts/navBar";

describe('forecasting', () => {
    it('renders a forecasting tab', () => {
        render(<NavBar />)

        const forecasting = screen.getByText("Forecastings")


        expect(forecasting).toBeInTheDocument()
    })
})

describe('has forecasting tab', () => {
    it('renders a forecasting tab', () => {
        render(<NavBar />)

        const dashboard = screen.getByText("Dashboard")
        fireEvent.click(dashboard);

        // expect(dashboard).toBeInTheDocument()
        expect(global.window.location.pathname).toBe('/');

    })

})

describe('redirect to home when clicking logo ', () => {
    it('redirects to dashboard', () => {
        render(<NavBar/>)

        const logo = screen.getByTestId("logo")
        fireEvent.click(logo);

        expect(global.window.location.pathname).toBe('/');

    })
})

describe('admin button not displayed by default', () => {
    it('not displayed', () => {
        render(<NavBar />)

        const adminButtons = screen.queryAllByText('Admin')
        expect(adminButtons).toHaveLength(0)
    })
})

describe('admin button displayed when isDirector is true', () => {
    it('displayed', () => {
        render(<NavBar isDirector={true} />)

        const adminButtons = screen.queryAllByText('Admin')
        expect(adminButtons).toHaveLength(1)
    })
})

