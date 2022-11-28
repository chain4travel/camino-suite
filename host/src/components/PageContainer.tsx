import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

export default function PageContainer({
  pageTitle,
  metaContent,
  children,
}: {
  pageTitle: string;
  metaContent: string;
  children: React.ReactNode;
}) {
  return (
    <Container fixed maxWidth="xl" sx={{ minHeight: '500px' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaContent} />
      </Helmet>
      {children}
    </Container>
  );
}
