import React from 'react';
import Icon from '@mdi/react';
import OutlinedContainer from 'app/components/OutlinedContainer';
import OutlinedFilledContainer from 'app/components/OutlinedFilledContainer';
import DetailsField from 'app/components/DetailsField';

export default function CopyTitleCard({
  label,
  value,
  icon,
  mixedStyle = false,
}: {
  label: string;
  value: string;
  icon: string;
  mixedStyle?: boolean;
}) {
  return (
    <>
      {!mixedStyle ? (
        <OutlinedContainer transparent={false}>
          <DetailsField
            field={label}
            value={value}
            type="string"
            icon={
              <Icon
                path={icon}
                color="latestList.iconColor"
                style={{ width: '20px', height: '20px' }}
              />
            }
            allowCopy={true}
            style={{ padding: '1rem' }}
          />
        </OutlinedContainer>
      ) : (
        <OutlinedFilledContainer>
          <DetailsField
            field={label}
            value={value}
            type="string"
            icon={
              <Icon
                path={icon}
                color="latestList.iconColor"
                style={{ width: '20px', height: '20px' }}
              />
            }
            allowCopy={true}
            style={{ padding: '1rem' }}
          />
        </OutlinedFilledContainer>
      )}
    </>
  );
}
