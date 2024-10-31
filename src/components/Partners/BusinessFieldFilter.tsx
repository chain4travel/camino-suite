import { mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { Divider, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useMemo } from 'react';
import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer';

interface BusinessFieldFilterProps {
    state: StatePartnersType;
    dispatchPartnersActions: React.Dispatch<ActionType>;
}

interface GroupedBusinessField {
    category: string;
    fields: Array<{
        name: string;
        active: boolean;
        fullName: string;
    }>;
}

const BusinessFieldFilter: React.FC<BusinessFieldFilterProps> = ({
    state,
    dispatchPartnersActions,
}) => {
    const groupedBusinessFields = useMemo(() => {
        const grouped: Record<string, GroupedBusinessField> = {};
        
        state.businessField.forEach((field) => {
            const [category, subCategory] = field.name.split(' / ');
            
            if (!grouped[category]) {
                grouped[category] = {
                    category,
                    fields: []
                };
            }
            
            grouped[category].fields.push({
                name: subCategory || field.name,
                active: field.active,
                fullName: field.name
            });
        });
        
        return Object.values(grouped);
    }, [state.businessField]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        console.log(event.target.value);
        const selectedFields = event.target.value[1]
        dispatchPartnersActions({
            type: partnersActions.UPDATE_BUSINESS_FIELD,
            payload: selectedFields,
        });
    };


    return (
        <Select
            multiple
            value={['default']}
            onChange={handleChange}
            sx={{
                flex: '1 1 250px',
                padding: '0',
                borderRadius: '12px',
                paddingRight: '0px !important',
                maxWidth: { xs: '100%', sm: '50%', md: '250px' },
                overflow: 'hidden',
                '.MuiSelect-select ': {
                    boxSizing: 'border-box',
                    height: '40px',
                    padding: '10px 16px 10px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    border: theme => `solid 1px ${theme.palette.card.border}`,
                },
                '& .MuiPopover-paper ul': {
                    paddingRight: 'unset !important',
                    width: '100% !important',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                },
                '& [aria-expanded=true]': {
                    background: theme =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.grey[600]
                            : theme.palette.grey[200],
                    boxSizing: 'border-box',
                    height: '40px',
                },
            }}
            renderValue={() => <Typography variant="caption">Business fields</Typography>}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: '400px',
                        overflow: 'auto',
                    },
                },
            }}
        >
            {groupedBusinessFields.flatMap((group, groupIndex) => [
                // Category Header as a disabled MenuItem
                <MenuItem
                    key={`header-${groupIndex}`}
                    disabled
                    sx={{
                        opacity: 1,
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[100],
                        py: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color: theme => theme.palette.text.secondary,
                        }}
                    >
                        {group.category}
                    </Typography>
                </MenuItem>,
                
                // Fields under each category
                ...group.fields.map((field, fieldIndex) => (
                    <MenuItem key={`field-${groupIndex}-${fieldIndex}`} value={field.fullName}>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: field.active ? 600 : 500 }}
                                >
                                    {field.name}
                                </Typography>
                            }
                        />
                        {field.active && <Icon path={mdiCheckCircle} size={1} color="#B5E3FD" />}
                    </MenuItem>
                )),

                // Divider between categories
                groupIndex < groupedBusinessFields.length - 1 ? (
                    <Divider key={`divider-${groupIndex}`} sx={{ my: 1 }} />
                ) : null,
            ])}
        </Select>
    );
};

export default BusinessFieldFilter;
