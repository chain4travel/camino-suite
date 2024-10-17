import { ExplorerStoreProvider } from 'Explorer/useStore'
import React from 'react'
import { hydrate } from 'react-dom'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import Root from './layout/index'
import { configureAppStore } from './redux/store'
import ThemeConfig from './theme'

export const store = configureAppStore()

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)

const test = document.getElementById('app')
if (test.hasChildNodes()) {
    hydrate(
        <React.StrictMode>
            <HelmetProvider>
                <ExplorerStoreProvider>
                    <ReduxProvider store={store}>
                        <ThemeConfig>
                            <Root />
                        </ThemeConfig>
                    </ReduxProvider>
                </ExplorerStoreProvider>
            </HelmetProvider>
        </React.StrictMode>,
        root,
    )
} else
    root.render(
        <React.StrictMode>
            <HelmetProvider>
                <ExplorerStoreProvider>
                    <ReduxProvider store={store}>
                        <ThemeConfig>
                            <Root />
                        </ThemeConfig>
                    </ReduxProvider>
                </ExplorerStoreProvider>
            </HelmetProvider>
        </React.StrictMode>,
    )
