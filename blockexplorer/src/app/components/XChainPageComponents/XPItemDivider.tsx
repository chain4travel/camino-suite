import React from 'react';
import { Divider } from '@mui/material';

export default function XPItemDivider({
  index,
  max,
  children,
}: {
  index: number;
  max: number;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {index < max && <Divider sx={{ marginBottom: '1rem', width: '100%' }} />}
    </>
  );
}
