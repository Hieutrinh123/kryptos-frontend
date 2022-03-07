import Button from '@mui/material/Button'
import { ArrowDropUp } from '@mui/icons-material'
import React from 'react';


interface ButtonGotoTopProps {
}

const ButtonGotoTop: React.FC<ButtonGotoTopProps> = ({

    ...otherMenuProps
}) => {
    return (
        <Button
            sx={{
                position: 'fixed !important',
                bottom: '48px',
                right: "48px",
                width: '45px',
                minWidth: '45px',
                height: '45px',
                background: 'linear-gradient(98.63deg, #4795E3 11.76%, #4BC1E4 96.82%)',
                borderRadius: '50%'
            }}
        >
            <ArrowDropUp sx={{
                color: '#ffffff'
            }} />
        </Button>
    )
}

export default ButtonGotoTop;