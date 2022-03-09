import { Box, Button } from '@mui/material';
import React from 'react';
import PaginationBasic from '../PaginationBasic';


interface PaginationNotificationProps {
    count: number,
}

const PaginationNotification: React.FC<PaginationNotificationProps> = ({
    count,
    ...otherMenuProps
}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '32px 0 64px' }}>
            <PaginationBasic count={12} />
            <Button sx={{ fontWeight: 900, fontSize: 14, lineHeight: '14px', color: '#ffffff' }} > Cũ hơn</Button>
        </Box>
    )
}

export default PaginationNotification;