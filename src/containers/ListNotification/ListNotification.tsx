import PaginationNotification from '@/components/PaginationNotification';
import { ArrowForwardIos } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { datas, NotiItems } from './dataTest';

const TYPE_NOTI = {
    POST: 'post',
    AUTHOR: 'author'
}

interface ListNotificationProps { }

const ListNotification: React.FC<ListNotificationProps> = ({ }) => {

    const renderListItems = (datas: NotiItems[]) => datas.map(({ type, desc, avt, time, title }, idx: number) => (
        <ListItem alignItems="flex-start" key={idx}>
            <ListItemAvatar>
                <Badge
                    variant="dot"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: type === TYPE_NOTI.AUTHOR ? '50%' : '12px'
                    }}

                >
                    <Avatar
                        alt="Remy Sharp"
                        src={avt}

                    />
                </Badge>
            </ListItemAvatar>
            <ListItemText
                sx={{
                    flex: 1
                }}
                primary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                        fontWeight={700}
                    >
                        {title}
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                            fontWeight={400}

                        >
                            {desc}
                        </Typography>
                    </React.Fragment>
                }
            />
            <Typography
                variant='body2'
                sx={(theme) => ({
                    color: theme.palette.grey['300'],
                    fontWeight: '400',
                    alignSelf: 'center'
                })}
            >
                {time}
            </Typography>
            <ArrowForwardIos sx={{ alignSelf: 'center', marginLeft: '12px' }} fontSize='small' />
        </ListItem >
    ))

    return (
        <Box>
            <List sx={{ width: '600px', maxWidth: 600 }}>
                {renderListItems(datas)}
            </List>
            <PaginationNotification count={10} />
        </Box>

    );
};

export default ListNotification;
