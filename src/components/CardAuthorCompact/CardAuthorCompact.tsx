import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


interface CardAuthorProps {
    authorAvatar: string,
    authorName: string
}

const CardAuthorCompact: React.FC<CardAuthorProps> = ({
    authorAvatar,
    authorName,
    ...otherMenuProps
}) => {
    return (
        <Card
            sx={{ maxWidth: '196px', borderRadius: '24px', display: 'flex', alignItems: 'center', flexDirection: 'column ', padding: '24px' }}
        >
            <CardMedia
                component="img"

                // image="/static/images/cards/contemplative-reptile.jpg"
                // alt="green iguana"
                sx={{
                    background: '#000000',
                    borderRadius: '50%',
                    width: '96px',
                    height: '96px',
                }}
            />
            <CardContent sx={{ marginTop: '20px', padding: '0 !important' }}>
                <Typography
                    variant="h5"
                    component="div"
                >
                    {authorName}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default CardAuthorCompact;