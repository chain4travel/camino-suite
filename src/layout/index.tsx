import { BrowserRouter } from 'react-router-dom'
import MainLayout from './MainLayout'
import React from 'react'
import RoutesSuite from './RoutesSuite'
import ScrollToTop from '../components/ScrollToTop'

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
