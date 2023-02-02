import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import MainLayout from './MainLayout'
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
