import { Components } from "@mui/material/styles/components";
export const CommonMuiPagination: Components["MuiPagination"] = { styleOverrides: {
    root: {
        '& button': {
            backgroundColor: 'transparent !important',
            margin: 4,
            padding: 0,
            minWidth: 0,
            fontWeight: 400
        },
        '& .Mui-selected':{
            fontWeight: 900
        },
        '& .MuiTouchRipple-root':{
            width: 0
        }
    }
} } ;
export const LightModeMuiPagination: Components["MuiPagination"] = { styleOverrides: {} };
export const DarkModeMuiPagination: Components["MuiPagination"] = { styleOverrides: {} };