import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@babel/preset-react'
import React from 'react'
import Dashboard from "../pages/admin/dashboard";

// Need to fix test
// describe('admin dashboard', () => {
//
//     beforeEach(() => {
//         render(<Dashboard/>)
//     })
//
//
//     it('renders an admin nav bar', () => {
//         const nav = screen.getByText("Onboarding")
//         expect(nav).toBeInTheDocument()
//     })
//
// })
