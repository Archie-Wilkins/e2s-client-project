import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import PublicTopNav from '../public/components/layouts/PublicTopNav';


describe('publicTopNavBar', () => {
    beforeEach(() => {
        render(<PublicTopNav />)
    })

    it('hasLogo', () => {
        const aboutUs = screen.getByText("About Us")
        expect(aboutUs).toBeInTheDocument()
    })



    it('hasJoinUsButton', () => {
        const joinUsButton = screen.getByText("Join Us")
        expect(joinUsButton).toBeInTheDocument()
    })
})
