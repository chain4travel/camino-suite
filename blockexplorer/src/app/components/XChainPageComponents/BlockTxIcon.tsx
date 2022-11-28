import * as React from 'react';
import { Box } from '@mui/material';
import { mdiCubeOutline } from '@mdi/js';
import { mdiTransfer } from '@mdi/js';
import Icon from '@mdi/react';

export default function BlockTxIcon({ iconType }: { iconType?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'latestList.iconBackground',
        borderRadius: '12px',
        minWidth: '50px',
        minHeight: '50px',
        width: '50px',
        height: '50px',
      }}
    >
      {iconType === 'block' ? (
        <Icon path={mdiCubeOutline} size={1} color="latestList.iconColor" />
      ) : (
        <Icon path={mdiTransfer} size={1} color="latestList.iconColor" />
      )}
    </Box>
  );
}
