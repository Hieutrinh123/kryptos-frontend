import React from 'react'
import { Pagination } from '@mui/material'


interface PaginationBasicProps {
    count: number,
}

const PaginationBasic: React.FC<PaginationBasicProps> = ({
    count,

    ...otherMenuProps
}) => {
    return (
        <Pagination count={count} sx={{ justifyContent: 'center', display: 'flex', margin: '32px 0 64px' }} />
    )
}

export default PaginationBasic;