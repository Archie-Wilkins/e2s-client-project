import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import WeeklyEmail from "../../../pages/email/weeklyEmail";

describe('weeklyEmail', () => {

    beforeEach(() => {
        const { getByTestId, getByText } = render(<WeeklyEmail/>)

    })

    it('weekly email page successfully rendered', () => {
        const weeklyEmail = screen.getByText("Fetch User Data")
        expect(weeklyEmail).toBeInTheDocument()
    })


})

