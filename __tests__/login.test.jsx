import {fireEvent, render, screen} from '@testing-library/react'
import Login from '../pages/login'
import '@testing-library/jest-dom'
import NavBar from "../public/components/layouts/navBar"
import user from '@testing-library/user-event'
import '@babel/preset-react'
import React from 'react'
import Input from 'react-validation/build/input'

describe('login', () => {

    let emailInput
    let passwordInput
    let form

    beforeEach(() => {
        const { getByTestId, getByText } = render(<Login/>)

        emailInput = screen.getByRole('textbox')
        passwordInput = screen.getByTestId('password')
        form = screen.getByTestId('form')
    })

    it('login form successfully rendered', () => {
        const signIn = screen.getByText("Sign In")
        expect(signIn).toBeInTheDocument()
    })



    it('testing validation with no information entered', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: ''},
            });

            fireEvent.change(passwordInput, {
                target: {value: ''},
            })
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(form)
        })();



        (async ( ) => {
            fireEvent.submit(form)
        })();

        const errorTxt = await screen.getByTestId('error')
        expect(errorTxt.innerText).toBe("Invalid credentials")

    })

    it('tests no password validation', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: 'example@gmail.com'},
            });

            fireEvent.change(passwordInput, {
                target: {value: ''},
            })
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(form)
        })();

        const errorTxt = screen.getByTestId('error')
        expect(errorTxt.innerText).toBe("Invalid password")

    })

    it('tests no email validation', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: ''},
            });

            fireEvent.change(passwordInput, {
                target: {value: 'test'},
            })
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(form)
        })();

        const errorTxt = await screen.getByTestId('error')
        expect(errorTxt.innerText).toBe('Invalid email');

    })

    it('tests valid login credentials (not real user)', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: 'example@gmail.com'},
            });

            fireEvent.change(passwordInput, {
                target: {value: 'test'},
            })
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(form)
        })();

        const errorTxt = await screen.getByTestId('error')
        expect(errorTxt.innerText).toBe('API call error');

    })

})
