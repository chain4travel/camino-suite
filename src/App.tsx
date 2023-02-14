import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './layout/index'
import { HelmetProvider } from 'react-helmet-async'
import ThemeConfig from './theme'
import { Provider as ReduxProvider } from 'react-redux'
import { configureAppStore } from './redux/store'
import './index.css'
import { ExplorerStoreProvider } from 'Explorer/useStore'

export const store = configureAppStore()

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
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
