import {fireEvent, render, screen} from '@testing-library/react'
import ViewReports from '../pages/viewReports'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'

describe('viewReports', () => {

    beforeEach(() => {
        const { getByTestId, getByText } = render(<ViewReports/>)

    })

    it('reports page successfully rendered', () => {
        const viewReports = screen.getByText("Site Data")
        expect(viewReports).toBeInTheDocument()
    })


})

