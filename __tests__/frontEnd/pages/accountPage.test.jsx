import {fireEvent, render, screen} from '@testing-library/react'
import Account from '../../../pages/account'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'

describe('account', () => {


    beforeEach(() => {
        const { getByTestId, getByText } = render(<Account/>)
    })

    it('account page render text', () => {
        const account = screen.getByText("logout")
        expect(account).toBeInTheDocument();
    })

})
