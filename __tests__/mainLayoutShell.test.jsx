// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import MainLayoutShell from "../public/components/mainLayoutShell";

describe('mainlayoutshell', () => {
    it('renders a top bar with page name', () => {

        const ShellWithContent = () => (
            <div>
                <MainLayoutShell pageName={"Test"}>
                    <h1>Help</h1>
                </MainLayoutShell>
            </div>
        );
        render(<ShellWithContent/>);


        const pageTitle = screen.getByText("Test")

        expect(pageTitle).toBeInTheDocument()
    })
    it('renders a side bar with specified role links', () => {

        const ShellWithContent = () => (
            <div>
                <MainLayoutShell isAdmin={true} pageName={"Test"}>
                    <h1>Help</h1>
                </MainLayoutShell>
            </div>
        );
        render(<ShellWithContent/>);


        const onboarding = screen.getByText("Onboarding")

        expect(onboarding).toBeInTheDocument()
    })
})







