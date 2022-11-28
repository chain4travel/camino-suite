import React, { useState } from 'react';
import { Button, Alert, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export default function CopyButton({ value }: { value: string }) {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  const handleClick =
    (Transition: React.ComponentType<TransitionProps>) => () => {
      setTransition(() => Transition);
      setOpen(true);
      copyToClipboard(value);
    };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClick(TransitionUp)}
        variant="outlined"
        color="secondary"
        sx={{
          borderRadius: '25px',
          maxHeight: '40px',
          borderWidth: '1.5px',
          minWidth: '40px',
          '&:hover': {
            borderColor: 'primary.contrastText',
          },
        }}
      >
        <ContentCopyOutlinedIcon
          sx={{ color: 'primary.contrastText', fontSize: '17px' }}
        />
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        key={transition ? transition.name : ''}
        autoHideDuration={1500}
      >
        <Alert
          severity="success"
          sx={{
            borderRadius: '12px',
          }}
        >
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
}
