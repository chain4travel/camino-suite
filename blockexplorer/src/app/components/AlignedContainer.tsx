import * as React from 'react';
import { Container } from '@mui/material';

export default function AlignedContainer({ ...props }) {
  return (
    <Container
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      {props.children}
    </Container>
  );
}
