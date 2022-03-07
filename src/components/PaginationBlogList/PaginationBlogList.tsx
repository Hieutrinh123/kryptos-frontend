import { Box, Button, Pagination } from '@mui/material';
import React from 'react';


interface PaginationBlogListProps {
    count: number,
}

const PaginationBlogList: React.FC<PaginationBlogListProps> = ({
    count,

    ...otherMenuProps
}) => {
    return (
        <Box className='pagination__blog' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '32px 0 64px' }}>
            <Pagination count={12} />
            <Button sx={{ fontWeight: 900, fontSize: 18 }} > Bài viết cũ hơn</Button>
        </Box>
    )
}

export default PaginationBlogList;