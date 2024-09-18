import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'

import React, { useState } from 'react'

const ServiceList = ({ listName, services }) => {
    const [expandedType, setExpandedType] = useState<string | false>(false)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedType(isExpanded ? panel : false)
    }

    const parseServiceName = (serviceName: string) => {
        const parts = serviceName.split('.')
        let name = parts[parts.length - 1]
        name = name.endsWith('Service') ? name.slice(0, -7) : name
        return {
            messageType: parts[2],
            name,
            version: parts[3],
        }
    }

    const groupServicesByType = () => {
        const grouped: { [key: string]: Array<{ name: string; version: string }> } = {}
        services.forEach(service => {
            const { messageType, name, version } = parseServiceName(service)
            if (!grouped[messageType]) {
                grouped[messageType] = []
            }
            grouped[messageType].push({ name, version })
        })
        return grouped
    }

    const groupedServices = groupServicesByType()

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                p: '16px',
            }}
        >
            <Typography variant="body2" component="div">
                {listName}
            </Typography>
            {Object.entries(groupedServices).map(([messageType, services]) => (
                <Accordion
                    sx={{ borderRadius: '12px' }}
                    key={messageType}
                    expanded={expandedType === messageType}
                    onChange={handleChange(messageType)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${messageType}-content`}
                        id={`${messageType}-header`}
                    >
                        <Typography variant="caption">{messageType}</Typography>
                        <Typography variant="caption" sx={{ ml: '8px', color: 'text.secondary' }}>
                            {services.length} item{services.length !== 1 ? 's' : ''}
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        <TableContainer>
                            <Table size="small" aria-label={`${messageType} services`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: '0' }}>
                                            <Typography variant="caption">Name</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">Version</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service, serviceIndex) => (
                                        <TableRow key={serviceIndex}>
                                            <TableCell sx={{ p: '0' }} component="th" scope="row">
                                                <Typography variant="caption">
                                                    {service.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {service.version}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Paper>
    )
}

export default ServiceList
