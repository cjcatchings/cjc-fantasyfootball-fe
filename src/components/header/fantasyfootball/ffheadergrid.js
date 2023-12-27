import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function FFHeaderGrid(props){

    const {textColor, children, ...other } = props

    return(
        <Grid item xs={10} sx={{color: textColor}}>
            {children}
        </Grid>
    );
}
