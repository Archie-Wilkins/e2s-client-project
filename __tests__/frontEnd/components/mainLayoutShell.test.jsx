// __tests__/index.test.jsx

import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Home from '../../../pages'
import '@testing-library/jest-dom'
import MainLayoutShell from "../../../public/components/layouts/mainLayoutShell";

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
    it('renders center content', () => {

        const ShellWithContent = () => (
            <div>
                <MainLayoutShell isDirector={true} pageName={"Test"}>
                    <h1>Help</h1>
                </MainLayoutShell>
            </div>
        );
        render(<ShellWithContent/>);


        const help = screen.getByText("Help")

        expect(help).toBeInTheDocument()
    })
})







