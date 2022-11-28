import { Helmet } from 'react-helmet-async';
import React from 'react';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  CChainPage,
  Blocks,
  CTransactions,
  Address,
} from './pages/CChainPages';
import {
  XChainPage,
  XAddressDetail,
  XPTransactions,
} from './pages/XChainPages';
import { PChainPage } from './pages/PChainPages';
import MainLayout from './Layout/MainLayout';
import { CssBaseline } from '@mui/material';
import { ComingSoonPage } from './pages/ComingSoon';
import { TransactionDetails, BlockDetails } from './pages/CChainPages';
import XPTransactionDetails from './pages/XChainPages/Transactions/XPTransactionsDetails';
import Validators from './pages/Validators';
import NotFoundPage from './pages/PageNotFound';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Helmet
        titleTemplate="%s | Camino Block Explorer"
        defaultTitle="Camino Block Explorer"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Camino Block Explorer" />
      </Helmet>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/c-chain" />} />
          <Route path="c-chain">
            <Route index element={<CChainPage />} />
            <Route path="blocks">
              <Route index element={<Blocks />} />
              <Route path=":id" element={<BlockDetails />} />
            </Route>
            <Route path="transactions">
              <Route index element={<CTransactions />} />
              <Route path=":id" element={<TransactionDetails />} />
            </Route>
            <Route path="address/:id" element={<Address />} />
          </Route>
          <Route path="x-chain">
            <Route index element={<XChainPage />} />
            <Route path="transactions">
              <Route index element={<XPTransactions />} />
              <Route path=":id" element={<XPTransactionDetails />} />
            </Route>
            <Route path="address/:id" element={<XAddressDetail />} />
          </Route>
          <Route path="p-chain">
            <Route index element={<PChainPage />} />
            <Route path="transactions">
              <Route index element={<XPTransactions />} />
              <Route path=":id" element={<XPTransactionDetails />} />
            </Route>
            <Route path="address/:id" element={<XAddressDetail />} />
          </Route>
          <Route path="/mainnet" element={<ComingSoonPage />} />
          <Route path="/validators" element={<Validators />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
