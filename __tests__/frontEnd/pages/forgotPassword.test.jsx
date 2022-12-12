import {fireEvent, render, screen} from '@testing-library/react'
import ForgotPassword from '../../../pages/forgotPassword'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import '@babel/preset-react'
import React from 'react'
import Input from 'react-validation/build/input'

describe('forgot password', () => {
    //input fields
    let emailInput
    let codeInput
    let passwordInput1
    let passwordInput2

    //forms
    let emailForm
    let codeForm
    let passwordForm

    beforeEach(() => {
        const { getByTestId, getByText } = render(<ForgotPassword/>)
        //inputs
        emailInput = screen.getByTestId('email')
        codeInput = screen.getByTestId('code')
        passwordInput1 = screen.getByTestId('password1')
        passwordInput2 = screen.getByTestId('password2')

        //forms
        emailForm = screen.getByTestId('email-form')
        codeForm = screen.getByTestId('code-form')
        passwordForm = screen.getByTestId('password-form')
    })

    it('forgotPassword form successfully rendered', () => {
        const forgotPassword = screen.getByText("Email")
        expect(forgotPassword).toBeInTheDocument()
    })

    it('testing validation with no information entered for email', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(emailForm)
        })();

        //expects error text to be 'Invalid email'
        const emailError = await screen.getByTestId('email-error')
        expect(emailError.innerText).toBe("Invalid email")
    })

    it('testing validation with false email', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: 'example-email-com'},
            });

        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(emailForm)
        })();

        //expects error text to be 'Invalid email'
        const emailError = await screen.getByTestId('email-error')
        expect(emailError.innerText).toBe("Invalid email")
    })

    it('tests validation with valid email that doesnt exist in database', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: 'ethanaharris10@gmail.com'},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(emailForm)
        })();

        //expects error text to be 'sample error text'
        //this is the default value that shouldn't have been changed if validation passes
        const emailError = await screen.getByTestId('email-error')
        expect(emailError.innerHTML).toBe("sample error text")
    })

    it('tests validation with valid email that exists in database', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(emailInput, {
                target: {value: 'ethanaharris10@gmail.com'},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(emailForm)
        })();

        //expects text below to be on screen if user has successfully used an emial in the system
        const text = screen.getByText("Your email should have recieved a code")
        expect(text).toBeInTheDocument()
    })

    it('tests validation with no code entered', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(codeInput, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(codeForm)
        })();

        //expects error text to be 'no code has been entered'
        const codeError = await screen.getByTestId("code-error")
        expect(codeError.innerText).toBe("no code has been entered")
    })

    it('tests validation with no code entered', async () => {

        //inputs data into fields
        (async ( ) => {
            fireEvent.change(codeInput, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(codeForm)
        })();

        //expects error text to be 'no code has been entered'
        const codeError = await screen.getByTestId('code-error')
        expect(codeError.innerText).toBe("no code has been entered")
    })

    it('tests validation with no password entered into both fields', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(passwordInput1, {
                target: {value: ''},
            });

            fireEvent.change(passwordInput2, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(passwordForm)
        })();

        //expects error text to be 'enter a password'
        const passwordError = await screen.getByTestId('password-error')
        expect(passwordError.innerText).toBe("enter a password")
    })

    it('tests validation with one password entered', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(passwordInput1, {
                target: {value: 'password'},
            });

            fireEvent.change(passwordInput2, {
                target: {value: ''},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(passwordForm)
        })();

        //expects error text to be 'make sure passwords match'
        const passwordError = await screen.getByTestId('password-error')
        expect(passwordError.innerText).toBe("make sure passwords match")
    })

    it('tests validation with both passwords entered but dont match', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(passwordInput1, {
                target: {value: 'password'},
            });

            fireEvent.change(passwordInput2, {
                target: {value: 'password_123'},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(passwordForm)
        })();

        //expects error text to be 'make sure passwords match'
        const passwordError = await screen.getByTestId('password-error')
        expect(passwordError.innerText).toBe("make sure passwords match")
    })

    it('tests validation with both passwords matching', async () => {
        //inputs data into fields
        (async ( ) => {
            fireEvent.change(passwordInput1, {
                target: {value: 'password'},
            });

            fireEvent.change(passwordInput2, {
                target: {value: 'password'},
            });
        })();

        //submits form
        (async ( ) => {
            fireEvent.submit(passwordForm)
        })();

        //expects error text to be 'API error, please try again'{
        const passwordError = await screen.getByTestId('password-error')

        //should throw a server error because jest hates API's :^)
        expect(passwordError.innerText).toBe("API error, please try again")
    })


})

