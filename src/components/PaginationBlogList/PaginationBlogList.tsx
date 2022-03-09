import { Box, Button } from '@mui/material';
import React from 'react';
import PaginationBasic from '../PaginationBasic';


interface PaginationBlogListProps {
    count: number,
}

const PaginationBlogList: React.FC<PaginationBlogListProps> = ({
    count,
    ...otherMenuProps
}) => {
    return (
        <Box className='pagination__blog' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '32px 0 64px' }}>
            <PaginationBasic count={12} />
            <Button sx={(theme) => ({ fontWeight: 900, fontSize: 14, lineHeight: '14px' })} > Bài viết cũ hơn</Button>
        </Box>
    )
}

export default PaginationBlogList;