// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import LandingPage from '../../../pages'


const apiRequest = jest.fn();

describe('LandingPage', () => {

    beforeEach(() => {
        render(<LandingPage/>)
    })


    it('renders request form', () => {
        const requestForm = screen.getByText("REQUEST FORM")
        expect(requestForm).toBeInTheDocument()
    })

})






