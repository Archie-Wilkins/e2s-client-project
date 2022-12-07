// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingComponent from '../public/components/landingComponent'
import '@babel/preset-react'
import React from 'react'

const apiRequest = jest.fn();

describe('dashboard', () => {

    let emailInput
    let businessInput
    let industryInput
    let form

    beforeEach(() => {
        const { getByTestId, getByText } = render(<I/>)

        emailInput = screen.getByTestId('email')
        businessInput = screen.getByTestId('business')
        industryInput = screen.getByTestId('industry')
        form = screen.getByTestId('form')
    })


    it('renders an admin dashboard tab', () => {
        const dashboard = screen.getByText("REQUEST FORM")
        //const nav = screen.getByText("Dan Schnee")
        expect(dashboard).toBeInTheDocument()
        //expect(nav).toBeInTheDocument()
    })

})






