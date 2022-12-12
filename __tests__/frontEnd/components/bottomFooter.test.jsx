import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import BottomFooter from "../../../public/components/layouts/bottomFooter";


describe('bottomFooter', () => {
    beforeEach(() => {
        render(<BottomFooter />)
    })

    it('hasCopyRight', () => {
        const copyRight = screen.getByText("© Empowering Energy Solutions 2022")
        expect(copyRight).toBeInTheDocument()
    })
})
