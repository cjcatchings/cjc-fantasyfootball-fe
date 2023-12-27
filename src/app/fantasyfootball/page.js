'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import GridPaperItem from '../../components/grid/gridPaperItem';
import Typography from '@mui/material/Typography';

export default function Page(props){

    const Item = GridPaperItem({height: '600px'});

    return (
        <Grid container maxWidth="lx" spacing={2} sx={{height: '100vh'}}>
            <Grid item xs={9}>
                <Item>
                    <Typography>Welcome to Fantasy Football!</Typography>
                </Item>
            </Grid>
            <MemorizedRightHandBox />
        </Grid>
    )
}

function RightHandBox(props){

    const Item = GridPaperItem({height: '600px'});
    console.log("Rendering RightHandBox");

    return (
        <Grid item xs={3}>
            <Item>
                <Typography>Team Standings</Typography>
                <div style={{paddingTop: '1em'}}></div>
            </Item>
        </Grid>
    );
}

const MemorizedRightHandBox = React.memo(RightHandBox);
