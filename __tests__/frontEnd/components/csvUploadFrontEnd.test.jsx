import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import CsvUploadComponent from '../../../public/components/csvUploadComponent'

const apiRequest = jest.fn();

describe('a page to upload and display csv data from a given template', () => {

    beforeEach(() => {
        const { getByTestId, getByText } = render(<CsvUploadComponent/>)

    })


    it('renders a download button for CSV template', () => {
        const templateDownload = screen.getByText("Download Template")
        expect(templateDownload).toBeInTheDocument()
    })

})






