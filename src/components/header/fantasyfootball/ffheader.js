'use client'

import * as React from 'react';
import {Grid} from '@mui/material';
import GridPaperItem from '../../grid/gridPaperItem';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import FFHeaderGrid from './ffheadergrid';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FantasyFootballNewsSlider from '../../fantasyfootball/news/newsSlider';
import tempHeadlines from '../../fantasyfootball/news/sample/sampleHeadlines.json';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

export default function FantasyFootballHeader(props){

    const isHome = props.isHome || false;
    const router = useRouter();
    const theme = useTheme();
    const userFullName = props.userFullName || 'Guy';
    const Item = GridPaperItem({bgcolor: theme.status.appHeaderBackground});

    const handleLogout = () => {
        localStorage.removeItem(AUTH_COOKIE_NAME);
        // TODO:  Push logout to backend to mark invalid token
        router.push("/login?action=doLogout");
    }

    const goHome = () => {
        router.push("/fantasyfootball");
    }

    const goToSubPage = (subPage) => {
        router.push(`/fantasyfootball/${subPage}`);
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <Item elevation={2} sx={{marginTop: '1em', marginBottom: '1em'}}>
                    <Grid container sx={{height: '100%'}}>
                        <Grid item xs={1}>
                            {!isHome ? <HomeIcon onClick={goHome} />: <></>}
                        </Grid>
                        <FFHeaderGrid textColor={theme.status.appHeaderText}>
                            <span>{userFullName ? `Hallo ${userFullName}!`: ''}</span>
                            <div style={{height: 30}}></div>
                            <div style={{textAlign: 'start', display: 'inline-flex', height: '30px'}}>
                                <ButtonGroup variant="contained" sx={{marginRight: '1em'}}>
                                    <Button onClick={() => goToSubPage("myroster")}>My Roster</Button>
                                    <Button onClick={() => goToSubPage("players")}>Players</Button>
                                    <Button onClick={() => goToSubPage("standings")}>Standings</Button>
                                    <Button>League</Button>
                                    <Button>Teams</Button>
                                    <Button>Settings</Button>
                                    <Button>Other</Button>
                                </ButtonGroup>
                                {isHome ? <FantasyFootballNewsSlider headlines={tempHeadlines}/>: <></>}
                            </div>
                        </FFHeaderGrid>
                        <Grid item xs={1}>
                            <LogoutIcon onClick={handleLogout} />
                        </Grid>
                    </Grid>
                </Item>
            </Grid>
        </Grid>
    );

}
