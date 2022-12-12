import {fireEvent, render, screen} from '@testing-library/react'
import WeeklyEmail from '../../../pages/weeklyEmail'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'

describe('weeklyEmail', () => {

    beforeEach(() => {
        const { getByTestId, getByText } = render(<WeeklyEmail/>)

    })

    it('weekly email page successfully rendered', () => {
        const weeklyEmail = screen.getByText("Fetch User Data")
        expect(weeklyEmail).toBeInTheDocument()
    })


})

