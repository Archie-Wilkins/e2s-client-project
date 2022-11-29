// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import LandingComponent from '../public/components/landingComponent';

describe('dashboard', () => {
    it('renders an admin dashboard tab', () => {
        render(<LandingComponent />)

        const dashboard = screen.getByText("About Us")

        expect(dashboard).toBeInTheDocument()
    })
})






