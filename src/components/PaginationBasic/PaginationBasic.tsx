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
        <Pagination className='pagination-basic__container' count={count} sx={{ justifyContent: 'center', display: 'flex' }} />
    )
}

export default PaginationBasic;