// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingComponent from '../public/components/landingComponent'
import '@babel/preset-react'
import React from 'react'


describe('dashboard', () => {

    let emailInput
    let businessInput
    let industryInput
    let form

    beforeEach(() => {
        const { getByTestId, getByText } = render(<LandingComponent/>)

        emailInput = screen.getByTestId('email')
        businessInput = screen.getByTestId('business')
        industryInput = screen.getByTestId('industry')
        form = screen.getByTestId('form')
    })


    it('renders an admin dashboard tab', () => {
        render(<LandingComponent />)

        const dashboard = screen.getByText("About Us")

        expect(dashboard).toBeInTheDocument()
    })

    it('testing enquiry validation with no information entered', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: ''},
            });

            fireEvent.change(businessInput, {
                target: {value: ''},
            });

            fireEvent.change(industryInput, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(form)
        })();

        /*const errorTxt = await screen.getByTestId('error')
        expect(errorTxt.innerText).toBe("Missing data!")*/

    })


})






