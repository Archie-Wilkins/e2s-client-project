import {fireEvent, render, screen} from '@testing-library/react'
import Login from '../pages/login'
import '@testing-library/jest-dom'
import LoginComponent from "../public/components/loginComponent.js"
import user from '@testing-library/user-event'

describe('login', () => {

    let view
    //Input fields
    let emailInput
    let passwordInput
    //Button
    let submitBtn

    beforeEach(() => {
        //render login component before each test
        view = render(<LoginComponent />)
        //gets input fields
        emailInput = screen.getByRole('textbox', { name: /email/ })
        passwordInput = screen.getByRole('textbox', { name: /password/ })
        //gets button
        submitBtn = screen.getByRole('button', { name: /submit/ })
    })

    it('login form successfully rendered', () => {
        const signIn = screen.getByText("Sign In")
        expect(signIn).toBeInTheDocument()
    })

    it('testing validation with no information entered', () => {
        user.click(submitBtn)
        const errorTxt = screen.getByText(/Invalid credentials/i)
        expect(errorTxt).toBeInTheDocument()
    })

    it('tests no password validation', () => {
        user.type(emailInput, "example@gmail.com")
        user.click(submitBtn)
        const errorTxt = screen.getByText(/Invalid credentials/i)
        expect(errorTxt).toBeInTheDocument()
    })

    it('tests no email validation', () => {
        user.type(passwordInput, "test")
        user.click(submitBtn)
        const errorTxt = screen.getByText(/Invalid password/i)
        expect(errorTxt).toBeInTheDocument()
    })

    it('tests false login credentials', () => {
        user.type(passwordInput, "example@gmail.com")
        user.type(passwordInput, "test")
        user.click(submitBtn)
        const errorTxt = screen.getByText(/password or email is incorrect/i)
        expect(errorTxt).toBeInTheDocument()
    })
    
    //will need to update the login credentials with new database
    it('tests successful login credentials', () => {
        user.type(emailInput, "ethanaharris10@gmail.com")
        user.type(passwordInput, "password")
        user.click(submitBtn)
        expect(global.window.location.pathname).toBe('/');
    })


})

