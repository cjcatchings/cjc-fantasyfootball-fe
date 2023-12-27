import * as React from 'react';
import FantasyFootballLayout from '../../components/layout/fantasyfootball/ffLayout';
import Grid from '@mui/material/Grid';
import GridPaperItem from '../../components/grid/gridPaperItem';
import SimpleStandings from '../../components/fantasyfootball/standings/simple/simpleStandings';
import Typography from '@mui/material/Typography';

export default function FantasyFootball(props){

    const Item = GridPaperItem({height: '600px'});

    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Item>
                    Welcome to Fantasy Football!
                </Item>
            </Grid>
            <MemorizedRightHandBox />
        </Grid>
    );

}

FantasyFootball.getLayout = (page) => {
    return (
       <FantasyFootballLayout isHome={true}>{page}</FantasyFootballLayout> 
    );
}

function RightHandBox(props){

    const Item = GridPaperItem({height: '600px'});
    console.log("Rendering RightHandBox");

    return (
        <Grid item xs={3}>
            <Item>
                <Typography>Team Standings</Typography>
                <div style={{paddingTop: '1em'}}><SimpleStandings/></div>
            </Item>
        </Grid>
    );
}

const MemorizedRightHandBox = React.memo(RightHandBox);
