// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingComponent from '../public/components/landingComponent'
import '@babel/preset-react'
import React from 'react'


describe('dashboard', () => {
    it('renders an admin dashboard tab', () => {
        render(<LandingComponent />)

        const dashboard = screen.getByText("About Us")

        expect(dashboard).toBeInTheDocument()
    })

})






