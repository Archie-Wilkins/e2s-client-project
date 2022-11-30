import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import AdminDashboardComponent from '../public/components/adminDashboardComponent'
import '@babel/preset-react'
import React from 'react'

describe('admin dashboard', () => {

    beforeEach(() => {
        const { getByTestId, getByText } = render(<AdminDashboardComponent/>)
    })


    it('renders an admin nav bar', () => {
        const nav = screen.getByText("Onboarding")
        expect(nav).toBeInTheDocument()
    })
    it('renders a table of businesses', () => {
        const dashboard = screen.getByTestId("businessTable")
        expect(dashboard).toBeInTheDocument()
    })
})
