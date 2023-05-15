import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './MainLayout'
import ScrollToTop from '../components/ScrollToTop'
import RoutesSuite from './RoutesSuite'

export default function Layout() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <MainLayout>
                <RoutesSuite />
            </MainLayout>
        </BrowserRouter>
    )
}
