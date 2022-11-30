// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingComponent from '../public/components/landingComponent'
import '@babel/preset-react'
import React from 'react'

const apiRequest = jest.fn();

const mRequest = (body, params) => {
    const req = {
        body: apiRequest.mockReturnValue(body || req),
        params: apiRequest.mockReturnValue(params || req),
        status: apiRequest.mockReturnValue("200"),
    };
    return req;
};

const mResponse = () => {
    const res = {
        status: apiRequest.mockReturnValue(res),
        json: apiRequest.mockReturnValue(res),
    }
    return res;
};

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
        const dashboard = screen.getByText("Welcome to E2S now!")
        expect(dashboard).toBeInTheDocument()
    })

    it('testing enquiry validation with no information entered', async () => {
        //inputs data into fields
        /*(async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: ''},
            });

            fireEvent.change(businessInput, {
                target: {value: ''},
            });

            fireEvent.change(industryInput, {
                target: {value: ''},
            });
        })();*/

        const data = {
            email: "",
            business: "",
            industry: "",
        }

        const JSONdata = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await mRequest(data, options);
        const result = await response;
        console.log(result);

        //submits form
        /*(async ( ) => {
            fireEvent.submit(form)
        })();*/

        /*const errorTxt = await screen.getByTestId('error')
        expect(errorTxt.innerText).toBe("Missing data!")*/

    })


})






